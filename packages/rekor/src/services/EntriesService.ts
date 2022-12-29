/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type {Error} from "../models/Error";
import type {LogEntry} from "../models/LogEntry";
import type {ProposedEntry} from "../models/ProposedEntry";
import type {SearchLogQuery} from "../models/SearchLogQuery";

import type {CancelablePromise} from "../core/CancelablePromise";
import {OpenAPI} from "../core/OpenAPI";
import {request as __request} from "../core/request";

export class EntriesService {
	/**
	 * Creates an entry in the transparency log
	 * Creates an entry in the transparency log for a detached signature, public key, and content. Items can be included in the request or fetched by the server when URLs are specified.
	 *
	 * @returns Error There was an internal error in the server while processing the request
	 * @returns LogEntry Returns the entry created in the transparency log
	 * @throws ApiError
	 */
	public static createLogEntry({
		proposedEntry,
	}: {
		proposedEntry: ProposedEntry;
	}): CancelablePromise<Error | LogEntry> {
		return __request(OpenAPI, {
			method: "POST",
			url: "/api/v1/log/entries",
			body: proposedEntry,
			errors: {
				400: `The content supplied to the server was invalid`,
				409: `The request conflicts with the current state of the transparency log`,
			},
		});
	}

	/**
	 * Retrieves an entry and inclusion proof from the transparency log (if it exists) by index
	 * @returns LogEntry the entry in the transparency log requested along with an inclusion proof
	 * @returns Error There was an internal error in the server while processing the request
	 * @throws ApiError
	 */
	public static getLogEntryByIndex({
		logIndex,
	}: {
		/** specifies the index of the entry in the transparency log to be retrieved **/
		logIndex: number;
	}): CancelablePromise<LogEntry | Error> {
		return __request(OpenAPI, {
			method: "GET",
			url: "/api/v1/log/entries",
			query: {
				logIndex: logIndex,
			},
			errors: {
				404: `The content requested could not be found`,
			},
		});
	}

	/**
	 * Get log entry and information required to generate an inclusion proof for the entry in the transparency log
	 * Returns the entry, root hash, tree size, and a list of hashes that can be used to calculate proof of an entry being included in the transparency log
	 * @returns LogEntry Information needed for a client to compute the inclusion proof
	 * @returns Error There was an internal error in the server while processing the request
	 * @throws ApiError
	 */
	public static getLogEntryByUuid({
		entryUuid,
	}: {
		/** the UUID of the entry for which the inclusion proof information should be returned **/
		entryUuid: string;
	}): CancelablePromise<LogEntry | Error> {
		return __request(OpenAPI, {
			method: "GET",
			url: "/api/v1/log/entries/{entryUUID}",
			path: {
				entryUUID: entryUuid,
			},
			errors: {
				404: `The content requested could not be found`,
			},
		});
	}

	/**
	 * Searches transparency log for one or more log entries
	 * @returns LogEntry Returns zero or more entries from the transparency log, according to how many were included in request query
	 * @returns Error There was an internal error in the server while processing the request
	 * @throws ApiError
	 */
	public static searchLogQuery({
		entry,
	}: {
		entry: SearchLogQuery;
	}): CancelablePromise<Array<LogEntry> | Error> {
		return __request(OpenAPI, {
			method: "POST",
			url: "/api/v1/log/entries/retrieve",
			body: entry,
			errors: {
				400: `The content supplied to the server was invalid`,
				422: `The server understood the request but is unable to process the contained instructions`,
			},
		});
	}
}
