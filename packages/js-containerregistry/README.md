# js-containerregistry

This is a Javascript library for working with container registries. It relies on google/go-containerregistry compiled in WebAssembly.

You should know:

- This library is rather large (~8 MB) due to the size of the wasm binary
- This library will install global polyfills from the [Golang WASM execution code](https://github.com/golang/go/blob/master/misc/wasm/wasm_exec.js). Consider running this library in a web worker.

## Usage

When using this library you are responsible for providing an initialization function that returns a [WebAssembly.Instance](https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/Instance). Different platforms and frameworks provide different utilities for loading WASM binaries. To increase portability, this library does not attempt to load the wasm file on its own.

WASM file location: `js-containerregistry/wasm/containerregistry.wasm`

### Vite

This library integrates particularly well with [Vite's handling of WebAssembly](https://vitejs.dev/guide/features.html#webassembly).

```typescript
import {ContainerRegistry} from "js-containerregistry";
import init from "js-containerregistry/wasm/containerregistry.wasm?init";

const cr = new ContainerRegistry(init);
const m = await cr.getManifest("mirror.kontain.me/gcr.io/distroless/static");
console.log(m);
```
