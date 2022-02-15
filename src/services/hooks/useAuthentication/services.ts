import * as i from 'types';
import 'isomorphic-fetch';
import qs from 'qs';

import config from './config';

import { EnvironmentTypes, AuthRequest, AuthRequestOptions } from './types';

export const getAuthenticationConfig = () => config();

export const getCurrentTimestamp = () => Math.floor(Date.now() / 1000);

const formatAuthApiOptions = (options: i.FetchOptions, method: string): AuthRequestOptions => {
  const { path, query, body } = options;
  const { AUTH_URLS } = getAuthenticationConfig();
  const apiBaseUrl = AUTH_URLS[import.meta.env.MODE as EnvironmentTypes];

  return {
    path: `${apiBaseUrl}${path}${query ? `?${qs.stringify(query, { encode: false })}` : ''}`,
    options: {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      ...(body && {
        body: JSON.stringify(body),
      }),
    },
  };
};

export const authRequest: AuthRequest = ({
  path, options,
}) => new Promise(async (resolve, reject) => {
  fetch(path, options)
    .then(async (response) => {
      if (response.ok) {
        return response.status !== 204
          ? response.json()
          : response.text();
      }

      return Promise.reject(response.json());
    })
    .then((json) => { resolve(json); })
    .catch((json) => {
      try {
        json.then((err: i.ApiError) => {
          reject(err);
        }).catch((err: i.ApiError) => {
          reject(err);
        });
      } catch (err) {
        reject(json);
      }
    });
});

export const Auth = {
  get: (options: i.FetchOptions) => authRequest(formatAuthApiOptions(options, 'GET')),
  del: (options: i.FetchOptions) => authRequest(formatAuthApiOptions(options, 'DELETE')),
  post: (options: i.FetchOptions) => authRequest(formatAuthApiOptions(options, 'POST')),
  put: (options: i.FetchOptions) => authRequest(formatAuthApiOptions(options, 'PUT')),
  patch: (options: i.FetchOptions) => authRequest(formatAuthApiOptions(options, 'PATCH')),
};
