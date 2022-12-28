declare module "*.wasm" {
	const initWasm: (
		options: WebAssembly.Imports
	) => Promise<WebAssembly.Instance>;
	export default initWasm;
}
