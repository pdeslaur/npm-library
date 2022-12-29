/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type {Error} from "../models/Error";
import type {SearchIndex} from "../models/SearchIndex";

import type {CancelablePromise} from "../core/CancelablePromise";
import type {BaseHttpRequest} from "../core/BaseHttpRequest";

export class IndexService {
	constructor(public readonly httpRequest: BaseHttpRequest) {}

	/**
	 * @deprecated
	 * Searches index by entry metadata
	 * EXPERIMENTAL - this endpoint is offered as best effort only and may be changed or removed in future releases.
	 * The results returned from this endpoint may be incomplete.
	 *
	 * @returns string Returns zero or more entry UUIDs from the transparency log based on search query
	 * @returns Error There was an internal error in the server while processing the request
	 * @throws ApiError
	 */
	public searchIndex({
		query,
	}: {
		query: SearchIndex;
	}): CancelablePromise<Array<string> | Error> {
		return this.httpRequest.request({
			method: "POST",
			url: "/api/v1/index/retrieve",
			body: query,
			errors: {
				400: `The content supplied to the server was invalid`,
			},
		});
	}
}
