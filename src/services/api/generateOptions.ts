import * as i from 'types';
import qs from 'qs';

import { getApiUrl } from './getApiUrl';

export const generateOptions: i.GenerateOptions = ({
  method, path, query, body, file = false, json = true, upload = false,
  withAuth = true, url,
}) => {
  if (!upload && body) body = JSON.stringify(body);
  if (!url) url = getApiUrl();

  return {
    path: `${url}${path}${query ? `?${qs.stringify(query, { encode: false })}` : ''}`,
    options: {
      headers: {
        ...!upload ? { 'Content-Type': 'application/json' } : {},
      },
      method,
      ...(body ? { body } : {}),
    },
    file,
    json,
    withAuth,
  };
};
