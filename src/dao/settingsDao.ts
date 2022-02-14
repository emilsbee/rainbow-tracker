import * as i from 'types';
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

/**
 * Fetches all category and activity types for a user.
 * @param userid of the user for which to fetch the category types full.
 */
export const getCategoryTypesFull = async (userid: string):Promise<{activityTypes: i.ActivityType[], categoryTypes: i.CategoryType[]}> => {
  try {
    const res = await fetch(`api/user/${userid}/category-types-full`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    });

    if (res.status === 401) {
      history.push('/login');
    } else if (!res.ok) {
      history.push('/internal-error');
    }

    return  await res.json() as {activityTypes: i.ActivityType[], categoryTypes: i.CategoryType[]};
  } catch (e) {
    history.push('/internal-error');
    return { categoryTypes: [], activityTypes: [] };
  }
};
