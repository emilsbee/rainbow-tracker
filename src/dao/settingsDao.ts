import * as i from 'types';

import { api } from 'services/api';

import { history } from '../routers/AppRouter';

/**
 * Restores a category type and its activities from being archived.
 * @param userid
 * @param categoryid
 */
export const restoreCategoryType = async (userid: string, categoryid: string):Promise<boolean> => {
  try {
    let success = true;

    const res = await fetch(`api/user/${userid}/category-type/restore/${categoryid}`, {
      method: 'PATCH',
      mode: 'cors',
      credentials: 'include',
    });

    if (res.status === 401) {
      history.push('/login');
      success = false;
    } else if (!res.ok) {
      history.push('/internal-error');
      success = false;
    }

    return success;
  } catch (e) {
    history.push('/internal-error');
    return false;
  }
};

/**
 * Deletes a category type.
 * @param userid
 * @param categoryid
 */
export const archiveCategory = async (userid:string, categoryid:string):Promise<boolean> => {
  try {
    let success = true;

    const res = await fetch(`api/user/${userid}/category-type/${categoryid}`, {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'include',
    });

    if (res.status === 401) {
      history.push('/login');
      success = false;
    } else if (!res.ok) {
      history.push('/internal-error');
      success = false;
    }

    return success;
  } catch (e) {
    history.push('/internal-error');
    return false;
  }
};

export const getCategoryTypesFull = async ():Promise<i.CategoryTypesFull> => {
  return new Promise((resolve, reject) => {
    api.get({
      path: '/category-types-full',
    })
      .then((res: i.CategoryTypesFull) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};
