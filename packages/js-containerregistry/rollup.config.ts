import typescript from "@rollup/plugin-typescript";
import {RollupOptions} from "rollup";

const configs: RollupOptions[] = [
	{
		input: "src/index.ts",
		output: [
			{
				file: `dist/index.mjs`,
				format: "es",
				sourcemap: true,
			},
			{
				file: `dist/index.cjs`,
				format: "cjs",
				sourcemap: true,
			},
		],
		plugins: [typescript()],
	},
];

export default configs;
