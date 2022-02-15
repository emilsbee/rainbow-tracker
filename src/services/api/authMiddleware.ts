import * as i from 'types';

import { getAuthenticationToken } from 'hooks/useAuthentication';

import { redirectToLogin } from './redirectToLogin';

export const authMiddleware: i.Middleware = (next) => async (requestOptions) => {
  if (requestOptions.withAuth) {
    await getAuthenticationToken()
      .then((token) => {
        requestOptions.options.headers = {
          ...requestOptions.options.headers,
          'Authorization': `Bearer ${token}`,
        };
      })
      .catch((e) => {
        redirectToLogin();
      });
  }

  next(requestOptions);
};
