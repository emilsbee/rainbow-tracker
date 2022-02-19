import * as i from 'types';
import { useQuery, UseQueryResult } from 'react-query';

import { api } from 'services/api';

export const useGetWeek = (weekNr: number, weekYear: number): UseQueryResult<i.FullWeek> => {
  return useQuery(
    ['week', weekNr, weekYear],
    async () => await api.get({
      path: '/week',
      query: {
        week_number: weekNr,
        week_year: weekYear,
      }
    }),
    {
      select: (res: i.FullWeek) => {
        return res;
      },
    },
  );
};
