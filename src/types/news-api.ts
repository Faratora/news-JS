export enum ApiStatus {
    Ok = 'ok',
    Error = 'error',
}

export enum ApiEndpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export enum MockEndpoint {
    Sources = 'mocks/sources',
    Everything = 'mocks/everything',
}

export enum RequestMethod {
    Get = 'GET',
}

export enum HttpStatusCode {
    Unauthorized = 401,
    NotFound = 404,
}

export type Endpoint = ApiEndpoint | MockEndpoint;

export interface NewsSource {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly url: string;
    readonly category: string;
    readonly language: string;
    readonly country: string;
}

export type NewsSourceShort = Pick<NewsSource, 'id' | 'name'>;

export interface NewsArticle {
    readonly source: NewsSourceShort;
    readonly author: string | null;
    readonly title: string;
    readonly description: string | null;
    readonly url: string;
    readonly urlToImage: string | null;
    readonly publishedAt: string;
    readonly content: string | null;
}

export interface SourcesResponse {
    readonly status: ApiStatus;
    readonly sources?: ReadonlyArray<NewsSource>;
}

export interface ArticlesResponse {
    readonly status: ApiStatus;
    readonly totalResults?: number;
    readonly articles?: ReadonlyArray<NewsArticle>;
}

export type ApiResponse = SourcesResponse | ArticlesResponse;

export type Callback<T> = (data: T) => void;

export type RequestParams = Partial<{
    apiKey: string;
    sources: string;
}>;

export interface RequestConfig {
    readonly endpoint: Endpoint;
    readonly options?: RequestParams;
}

export type EndpointsConfig = Readonly<{
    sources: Endpoint;
    news: Endpoint;
}>;
