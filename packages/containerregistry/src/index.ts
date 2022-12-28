import ggcr from "./assets/go-containerregistry.wasm";
import "./assets/wasm_exec.js";

interface GGCR {
	getManifest(image: string): Promise<string>;
}

declare const containerregistry: GGCR;

const go = new Go();
const loading = ggcr(go.importObject).then(wasm => {
	go.run(wasm);
});

function WasmWrapper<T extends (...args: any) => any>(
	fn: T
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
	return args => loading.then(() => fn.call(args));
}

export const getManifest = WasmWrapper(containerregistry.getManifest);
