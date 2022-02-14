import * as i from 'types';
import { history } from '../../routers/AppRouter';

export const getTotalPerDaySpecific = async (userid: string, day: number, weekNr: number, year: number):Promise<i.TotalPerDaySpecific> => {
  const res = await fetch(`/api/user/${userid}/analytics/total-per-day/${day}/?week_number=${weekNr}&week_year=${year}`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  });

  if (res.ok) {
    return await res.json() as i.TotalPerDaySpecific;
  } else if (res.status === 401) {
    history.push('/login');
  } else if (res.status === 404) {
    throw new Error('No analytics for this day.');
  } else {
    throw new Error('Fetching analytics failed.');
  }
  return {} as i.TotalPerDaySpecific;
};
