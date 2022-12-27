package main

import (
	"fmt"
	"net/http"
	"syscall/js"
	"time"

	"github.com/google/go-containerregistry/pkg/authn"
	"github.com/google/go-containerregistry/pkg/name"
	"github.com/google/go-containerregistry/pkg/v1/remote"
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
	getManifestFn := js.FuncOf(promiseWrap(getManifest))
	defer getManifestFn.Release()

	js.Global().Set("containerregistry", js.ValueOf(map[string]interface{}{
		"getManifest": getManifestFn,
	}))

	<-done
}

type JsFn = func(this js.Value, args []js.Value) any

func promiseWrap[K any](fn func(args []js.Value) (K, error)) JsFn {
	return func(this js.Value, args []js.Value) interface{} {
		handler := js.FuncOf(func(this js.Value, pargs []js.Value) interface{} {
			resolve := pargs[0]
			reject := pargs[1]

			go func() {
				r, err := fn(args)
				if err != nil {
					reject.Invoke(err.Error())
				} else {
					resolve.Invoke(js.ValueOf(r))
				}
			}()

			return nil
		})
		defer handler.Release()

		return js.Global().Get("Promise").New(handler)
	}
}

func getManifest(args []js.Value) (string, error) {
	r := args[0].String()
	ref, err := name.ParseReference(r)
	if err != nil {
		return "", fmt.Errorf("parsing reference %q: %w", r, err)
	}

	d, err := remote.Get(ref, options...)
	if err != nil {
		return "", fmt.Errorf("fetching manifest %q: %w", r, err)
	}

	rm, err := d.RawManifest()
	if err != nil {
		return "", fmt.Errorf("raw manifest %q: %w", r, err)
	}
	return string(rm), nil
}
