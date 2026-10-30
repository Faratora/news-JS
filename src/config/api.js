const isProduction = process.env.NODE_ENV === 'production';

export const API_URL = process.env.API_URL || 'https://rss-news-api.onrender.com/';
export const API_KEY = process.env.API_KEY || '';

export const API_ENDPOINTS = isProduction
    ? {
          sources: 'sources',
          news: 'everything',
      }
    : {
          sources: 'mocks/sources',
          news: 'mocks/everything',
      };
