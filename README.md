# news-JS

Run application:  
- Copy and rename `.env.example` to `.env` and set variables with your data  
- Install dependencies by running command `npm install` in your terminal
- Run command in your terminal `npm start`  

The application uses the [News API proxy](https://rss-news-api.onrender.com/) because the original API is only available from localhost.  
In development (`npm start`) the proxy mock endpoints (`/mocks/sources` and `/mocks/everything`) are used automatically to save the API key limit.  
The production build (`npm run build`) uses the real `/sources` and `/everything` endpoints, so `API_KEY` must be set in `.env`.  
