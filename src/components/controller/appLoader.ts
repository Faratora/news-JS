import Loader from './loader';
import { API_KEY, API_URL } from '../../config/api';
import type { RequestParams } from '../../types/news-api';

class AppLoader extends Loader<RequestParams> {
    public constructor() {
        super(API_URL, API_KEY ? { apiKey: API_KEY } : {});
    }
}

export default AppLoader;
