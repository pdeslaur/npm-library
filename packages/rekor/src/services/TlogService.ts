/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type {ConsistencyProof} from "../models/ConsistencyProof";
import type {Error} from "../models/Error";
import type {LogInfo} from "../models/LogInfo";

import type {CancelablePromise} from "../core/CancelablePromise";
import type {BaseHttpRequest} from "../core/BaseHttpRequest";

export class TlogService {
	constructor(public readonly httpRequest: BaseHttpRequest) {}

	/**
	 * Get information about the current state of the transparency log
	 * Returns the current root hash and size of the merkle tree used to store the log entries.
	 * @returns LogInfo A JSON object with the root hash and tree size as properties
	 * @returns Error There was an internal error in the server while processing the request
	 * @throws ApiError
	 */
	public getLogInfo(): CancelablePromise<LogInfo | Error> {
		return this.httpRequest.request({
			method: "GET",
			url: "/api/v1/log",
		});
	}

	/**
	 * Get information required to generate a consistency proof for the transparency log
	 * Returns a list of hashes for specified tree sizes that can be used to confirm the consistency of the transparency log
	 * @returns ConsistencyProof All hashes required to compute the consistency proof
	 * @returns Error There was an internal error in the server while processing the request
	 * @throws ApiError
	 */
	public getLogProof({
		lastSize,
		firstSize = 1,
		treeId,
	}: {
		/** The size of the tree that you wish to prove consistency to **/
		lastSize: number;
		/** The size of the tree that you wish to prove consistency from (1 means the beginning of the log) Defaults to 1 if not specified
		 *  **/
		firstSize?: number;
		/** The tree ID of the tree that you wish to prove consistency for **/
		treeId?: string;
	}): CancelablePromise<ConsistencyProof | Error> {
		return this.httpRequest.request({
			method: "GET",
			url: "/api/v1/log/proof",
			query: {
				firstSize: firstSize,
				lastSize: lastSize,
				treeID: treeId,
			},
			errors: {
				400: `The content supplied to the server was invalid`,
			},
		});
	}
}
