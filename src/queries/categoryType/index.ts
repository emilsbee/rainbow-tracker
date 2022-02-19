import * as i from 'types';
import { useQuery, UseQueryResult } from 'react-query';

import { api } from 'services/api';

export const useGetCategoryTypesFull = (): UseQueryResult<i.CategoryTypesFull> => {
  return useQuery(
    'categoryTypesFull',
    async () => await api.get({
      path: '/category-types-full',
    }),
    {
      select: (res: i.CategoryTypesFull) => {
        return res;
      },
    },
  );
};