/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Schema for Helm objects
 */
export type HelmSchema = HelmV001Schema;

/**
 * Schema for Helm object
 */
export interface HelmV001Schema {
	/**
	 * The public key that can verify the package signature
	 */
	publicKey: {
		/**
		 * Specifies the content of the public key inline within the document
		 */
		content: string;
	};
	/**
	 * Information about the Helm chart associated with the entry
	 */
	chart: {
		/**
		 * Specifies the hash algorithm and value for the chart
		 */
		hash?: {
			/**
			 * The hashing function used to compute the hash value
			 */
			algorithm: "sha256";
			/**
			 * The hash value for the chart
			 */
			value: string;
		};
		/**
		 * The provenance entry associated with the signed Helm Chart
		 */
		provenance: {
			[k: string]: unknown;
		};
	};
}