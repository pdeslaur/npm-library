import ggcr from "./assets/go-containerregistry.wasm";
import "./assets/wasm_exec.js";

declare const containerregistry: {
	getManifest(image: string): Promise<string>;
};

const go = new Go();
const wasmObj = await ggcr(go.importObject);
go.run(wasmObj);

export const getManifest = containerregistry.getManifest;
