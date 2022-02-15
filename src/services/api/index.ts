import ApiHelper from './api';
import { authMiddleware } from './authMiddleware';

const apiHelper = new ApiHelper();
apiHelper.applyMiddleware([authMiddleware]);

const api = apiHelper.api;

export { api };
export * from './getApiUrl';
