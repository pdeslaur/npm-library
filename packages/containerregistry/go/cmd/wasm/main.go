package main

import (
	"fmt"
	"net/http"
	"syscall/js"
	"time"

	"github.com/google/go-containerregistry/pkg/authn"
	"github.com/google/go-containerregistry/pkg/name"
	"github.com/google/go-containerregistry/pkg/v1/remote"
	"philde.dev/npm-library/containerregistry/pkg/utils"
)

var (
	options = []remote.Option{
		remote.WithTransport(&http.Transport{
			Proxy:                 http.ProxyFromEnvironment,
			ForceAttemptHTTP2:     true,
			MaxIdleConns:          100,
			IdleConnTimeout:       90 * time.Second,
			TLSHandshakeTimeout:   10 * time.Second,
			ExpectContinueTimeout: 1 * time.Second,
		}),
		remote.WithAuth(authn.Anonymous),
	}
)

func main() {
	done := make(chan struct{})
	getManifestFn := utils.Promise(getManifest)
	defer getManifestFn.Release()

	js.Global().Set("containerregistry", js.ValueOf(map[string]interface{}{
		"getManifest": getManifestFn,
	}))

	<-done
}

func getManifest(args []js.Value) (js.Value, error) {
	r := args[0].String()
	ref, err := name.ParseReference(r)
	if err != nil {
		return js.Value{}, fmt.Errorf("parsing reference %q: %w", r, err)
	}

	d, err := remote.Get(ref, options...)
	if err != nil {
		return js.Value{}, fmt.Errorf("fetching manifest %q: %w", r, err)
	}

	rm, err := d.RawManifest()
	if err != nil {
		return js.Value{}, fmt.Errorf("raw manifest %q: %w", r, err)
	}
	return js.ValueOf(string(rm)), nil
}
