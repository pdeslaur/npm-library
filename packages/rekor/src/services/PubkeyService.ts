/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type {Error} from "../models/Error";

import type {CancelablePromise} from "../core/CancelablePromise";
import type {BaseHttpRequest} from "../core/BaseHttpRequest";

export class PubkeyService {
	constructor(public readonly httpRequest: BaseHttpRequest) {}

	/**
	 * Retrieve the public key that can be used to validate the signed tree head
	 * Returns the public key that can be used to validate the signed tree head
	 * @returns string The public key
	 * @returns Error There was an internal error in the server while processing the request
	 * @throws ApiError
	 */
	public getPublicKey({
		treeId,
	}: {
		/** The tree ID of the tree you wish to get a public key for **/
		treeId?: string;
	}): CancelablePromise<string | Error> {
		return this.httpRequest.request({
			method: "GET",
			url: "/api/v1/log/publicKey",
			query: {
				treeID: treeId,
			},
		});
	}
}
