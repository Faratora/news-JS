# NewsJS

News portal built with TypeScript and Webpack. The application loads news sources from
[News API](https://newsapi.org/) and displays the latest articles for the selected source.

## Run application

- Copy and rename `.env.example` to `.env` and set variables with your data
- Install dependencies by running command `npm install` in your terminal
- Run command in your terminal `npm start`

The application uses the [News API proxy](https://rss-news-api.onrender.com/) because the original API is only
available from localhost.  
In development (`npm start`) the proxy mock endpoints (`/mocks/sources` and `/mocks/everything`) are used
automatically to save the API key limit.  
The production build (`npm run build`) uses the real `/sources` and `/everything` endpoints, so `API_KEY` must be set
in `.env`.

## Scripts

- `npm start` — start the development server
- `npm run build` — create a production build in the `dist` directory
- `npm run lint` — run ESLint for TypeScript files
- `npm run type-check` — check types without emitting files

## Stack

- TypeScript with strict mode (`strict` and `noImplicitAny`)
- Webpack with `ts-loader`
- ESLint with `@typescript-eslint` and the `no-explicit-any` rule
- CSS with a responsive layout from `320px` to `1920px`

## Design improvements

- Responsive card grid for news articles
- Horizontally scrollable source filters
- Image fallbacks and hover states for news cards
- Footer with the author's GitHub, creation year and an RS School logo link
