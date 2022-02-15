import * as i from 'types';
import { compose } from 'redux';

import  { request } from './request';
import { generateOptions } from './generateOptions';

const runMiddleware: i.RunMiddleware = async (options, middlewares) => {
  // Make mutable copy of options
  let newOptions = { ...options };

  /**
   * Update request options
   * This is executed by the last middleware
   */
  const updateOptions = (requestOptions: i.RequestOptions) => {
    newOptions = requestOptions;
  };

  /**
   * Chain all middleware together
   * Pass updateOptions to last middleware in chain
   */
  const chain = compose<i.NextMiddleware>(...middlewares)(updateOptions);

  // Start running the middleware chain
  await chain(newOptions);

  return newOptions;
};

const setupRequest: i.SetupRequest = async (middlewares, options) => (
  request(
    await runMiddleware(
      generateOptions(options),
      middlewares,
    ),
  )
);

class ApiHelper {
  middlewares: i.Middleware[] = [];

  api: i.RequestApi = {
    get: (args) => this.generateRequest({ method: 'GET', ...args }),
    del: (args) => this.generateRequest({ method: 'DELETE', ...args }),
    post: (args) => this.generateRequest({ method: 'POST', ...args }),
    put: (args) => this.generateRequest({ method: 'PUT', ...args }),
    patch: (args) => this.generateRequest({ method: 'PATCH', ...args }),
  };

  applyMiddleware = (middlewareList?: i.Middleware[] | { [key: string]: i.Middleware }) => {
    if (Array.isArray(middlewareList)) {
      this.middlewares = middlewareList;
    } else if (typeof middlewareList === 'object') {
      this.middlewares = Object.values(middlewareList);
    } else {
      console.error('Middleware list applied to the API helper is not of type array or object');
    }
  };

  generateRequest = (options: i.Options) => setupRequest(this.middlewares, options);
}

export default ApiHelper;
