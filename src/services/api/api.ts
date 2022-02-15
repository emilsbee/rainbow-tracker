import * as i from 'types';

import  { request } from './request';
import { generateOptions } from './generateOptions';

const setupRequest: i.SetupRequest = async (options) => {
  return request(generateOptions(options));
};

export const apiHelper: i.RequestApi = {
  get: (args) => setupRequest({ method: 'GET', ...args }),
  del: (args) => setupRequest({ method: 'DELETE', ...args }),
  post: (args) => setupRequest({ method: 'POST', ...args }),
  put: (args) => setupRequest({ method: 'PUT', ...args }),
  patch: (args) => setupRequest({ method: 'PATCH', ...args }),
};
