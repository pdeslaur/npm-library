/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type {BaseHttpRequest} from "./core/BaseHttpRequest";
import type {OpenAPIConfig} from "./core/OpenAPI";
import {FetchHttpRequest} from "./core/FetchHttpRequest";

import {EntriesService} from "./services/EntriesService";
import {IndexService} from "./services/IndexService";
import {PubkeyService} from "./services/PubkeyService";
import {TlogService} from "./services/TlogService";

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class RekorClient {
	public readonly entries: EntriesService;
	public readonly index: IndexService;
	public readonly pubkey: PubkeyService;
	public readonly tlog: TlogService;

	public readonly request: BaseHttpRequest;

	constructor(
		config?: Partial<OpenAPIConfig>,
		HttpRequest: HttpRequestConstructor = FetchHttpRequest
	) {
		this.request = new HttpRequest({
			BASE: config?.BASE ?? "https://rekor.sigstore.dev",
			VERSION: config?.VERSION ?? "1.0.0",
			WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
			CREDENTIALS: config?.CREDENTIALS ?? "include",
			TOKEN: config?.TOKEN,
			USERNAME: config?.USERNAME,
			PASSWORD: config?.PASSWORD,
			HEADERS: config?.HEADERS,
			ENCODE_PATH: config?.ENCODE_PATH,
		});

		this.entries = new EntriesService(this.request);
		this.index = new IndexService(this.request);
		this.pubkey = new PubkeyService(this.request);
		this.tlog = new TlogService(this.request);
	}
}
