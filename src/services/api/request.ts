import * as i from 'types';
import { toast } from 'react-toastify';

export const request: i.Request = ({
  path, options, file, json,
}) =>  new Promise(async (resolve, reject) => {
  fetch(path, options)
    .then(async (response) => {
      if (response.ok) {
        if (file) return response.blob();
        if (json) return response.json();
        return response.text();
      } else {
        return Promise.reject(response.json());
      }
    })
    .then((json) => { resolve(json); })
    .catch((json) => {
      json.then((res: i.ApiError) => {
        reject(res);
      }).catch(() => {
        reject();
        toast.error('Network error.');
      });
    });
});
