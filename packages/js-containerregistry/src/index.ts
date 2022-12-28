import "./wasm_exec.js";

interface GGCR {
	getManifest(image: string): Promise<string>;
}

declare const containerregistry: GGCR;

export type Init = (
	options: WebAssembly.Imports
) => Promise<WebAssembly.Instance>;

export class ContainerRegistry {
	private readonly go = new Go();
	private readonly initPormise: Promise<WebAssembly.Instance>;

	constructor(init: Init) {
		this.initPormise = init(this.go.importObject);
		this.initPormise.then(wasm => {
			this.go.run(wasm);
		});
	}

	private WasmWrapper<T extends (...args: any) => any>(
		resolveFn: () => T
	): (...args: Parameters<T>) => Promise<ReturnType<T>> {
		return (...args) =>
			this.initPormise.then(() => resolveFn().apply(undefined, args));
	}

	getManifest = this.WasmWrapper(() => containerregistry.getManifest);
}
