import Loader from './loader';
import { API_URL, API_KEY } from '../../config/api';

class AppLoader extends Loader {
    constructor() {
        super(API_URL, API_KEY ? { apiKey: API_KEY } : {});
    }
}

export default AppLoader;
