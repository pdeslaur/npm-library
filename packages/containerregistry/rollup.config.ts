import typescript from "@rollup/plugin-typescript";
import {wasm} from "@rollup/plugin-wasm";
import {RollupOptions} from "rollup";

const bundle: RollupOptions = {
	input: "src/index.ts",
	output: [
		{
			file: `dist/index.mjs`,
			format: "es",
			sourcemap: true,
		},
	],

	plugins: [typescript(), wasm()],
};

export default bundle;
