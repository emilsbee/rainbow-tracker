import * as i from 'types';
import { history } from '../../routers/AppRouter';

/**
 * Fetches a week by week number and year for a specific user from the api.
 * @param userid for which to fetch the week.
 * @param weekNr of the week to fetch.
 * @param year of the week to fetch.
 */
export const getWeekByWeekNrAndYear = async (userid: string, weekNr: number, year: number):Promise<i.FullWeek[]> => {
  try {
    const res = await fetch(`api/user/${userid}/week?week_number=${weekNr}&week_year=${year}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    });

    if (res.ok) {
      return await res.json();
    } else {
      if (res.status === 400) {
        history.push('/internal-error');
      }

      return await createWeekByWeekNrAndYear(userid, weekNr, year);
    }
  } catch (e) {
    history.push('/internal-error');
    return await createWeekByWeekNrAndYear(userid, weekNr, year);
  }
};

/**
 * Creates a week with a given week number and year for a given user.
 * @param userid for which to create the week.
 * @param weekNr of the week to create.
 * @param year of the week to create.
 */
export const createWeekByWeekNrAndYear = async (userid: string, weekNr: number, year: number):Promise<i.FullWeek[]> => {
  try {
    const res = await fetch(`api/user/${userid}/weeks`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify({
        weekNr,
        weekYear: year,
      }),
    });

    if (res.ok) {
      return await res.json();
    } else {
      history.push('/internal-error');
      return [];
    }
  } catch (e) {
    history.push('/internal-error');
    return [];
  }
};

/**
 * Validates submission of new category. Checks the general string constraints for name and color.
 * Also, validates that all categories in the category setting object have unique names.
 * @param categoryid The categoryid of category to be checked.
 * @param name The name of the category.
 * @param color The color of the category.
 * @return {valid, message} Valid indicates whether input is valid, and message is present if the input is invalid.
 */
export const validateCategorySubmission = (categoryid:string, name:string, color:string):{valid:boolean, message:string} => {
  const returnVal = { valid: true, message: '' };

  if (!name || name.trim().length <= 0 || name.trim().length > 50) {
    returnVal.valid = false;
    returnVal.message = 'You must provide a category name of length 1-50.';
  } else if (!color || color.length <= 0 || color.length > 7 || color[0] !== '#') {
    returnVal.valid = false;
    returnVal.message = 'You must provide a valid hex color value.';
  }

  return returnVal;
};
