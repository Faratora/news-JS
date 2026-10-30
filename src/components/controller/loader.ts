import { HttpStatusCode, RequestMethod } from '../../types/news-api';
import type { Callback, Endpoint, RequestConfig, RequestParams } from '../../types/news-api';

class Loader<TParams extends RequestParams = RequestParams> {
    protected readonly baseLink: string;
    protected readonly options: Readonly<TParams>;

    public constructor(baseLink: string, options: TParams) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<TResponse>({ endpoint, options = {} }: RequestConfig, callback: Callback<TResponse>): void {
        void this.load<TResponse>(RequestMethod.Get, endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === HttpStatusCode.Unauthorized || res.status === HttpStatusCode.NotFound) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }

            throw new Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: RequestParams, endpoint: Endpoint): string {
        const urlOptions: RequestParams = { ...this.options, ...options };
        const baseLink: string = this.baseLink.endsWith('/') ? this.baseLink : `${this.baseLink}/`;
        const query: string = Object.entries(urlOptions)
            .filter(([, value]) => typeof value === 'string' && value.length > 0)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
            .join('&');

        return `${baseLink}${endpoint}${query ? `?${query}` : ''}`;
    }

    private async load<TResponse>(
        method: RequestMethod,
        endpoint: Endpoint,
        callback: Callback<TResponse>,
        options: RequestParams = {}
    ): Promise<void> {
        try {
            const response: Response = await fetch(this.makeUrl(options, endpoint), { method });
            const checkedResponse: Response = this.errorHandler(response);
            const data = (await checkedResponse.json()) as TResponse;

            callback(data);
        } catch (error: unknown) {
            console.error(error);
        }
    }
}

export default Loader;
