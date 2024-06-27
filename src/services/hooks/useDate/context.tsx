import * as i from 'types';
import * as React from 'react';
import { DateTime } from 'luxon';

import { NumberParam, useQueryParam } from 'use-query-params';

import { WEEK_QUERY_STRING, YEAR_QUERY_STRING } from './constants';

export const DateContext = React.createContext<i.DateContextType>(undefined);

export const DateProvider: React.FC = ({ children }) => {
  const [queryWeekNr] = useQueryParam(WEEK_QUERY_STRING, NumberParam);
  const [queryYear] = useQueryParam(YEAR_QUERY_STRING, NumberParam);

  const initialState = {
    weekNr: queryWeekNr || DateTime.now().weekNumber,
    year: queryYear || DateTime.now().startOf('week').year,
  };

  const [weekNr, setWeekNr] = React.useState<number>(initialState.weekNr);
  const [year, setYear] = React.useState<number>(initialState.year);


  const updateDate: i.DateContextDispatch = ({ weekNr, year }) => {
    const weekNumber = weekNr as any;
    setWeekNr(weekNumber);
    setYear(year);

    return { weekNr: weekNumber, year };
  };

  return (
    <DateContext.Provider
      value={{
        weekNr: 2,
        year: 2022,
        updateDate,
        realWeekNr: DateTime.now().weekNumber,
        realYear: DateTime.now().startOf('week').year,
      }}>
      {children}
    </DateContext.Provider>
  );
};
