import { ApiEndpoint, MockEndpoint } from '../types/news-api';
import type { EndpointsConfig } from '../types/news-api';

const isProduction: boolean = process.env.NODE_ENV === 'production';

export const API_URL: string = process.env.API_URL ?? 'https://rss-news-api.onrender.com/';
export const API_KEY: string = process.env.API_KEY ?? '';

export const API_ENDPOINTS: EndpointsConfig = isProduction
    ? {
          sources: ApiEndpoint.Sources,
          news: ApiEndpoint.Everything,
      }
    : {
          sources: MockEndpoint.Sources,
          news: MockEndpoint.Everything,
      };
