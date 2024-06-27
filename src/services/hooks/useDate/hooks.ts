import * as React from 'react';
import { DateTime } from 'luxon';
import { NumberParam, useQueryParam } from 'use-query-params';

import { DateContext } from './context';
import { WEEK_QUERY_STRING, YEAR_QUERY_STRING } from './constants';

export const useDate = () => {
  const context = React.useContext(DateContext);
  if (context === undefined) {
    throw new Error('useDate must be used within a DateProvider');
  }
  return context;
};

export const useDateActions = () => {
  const setQueryWeekNr = useQueryParam(WEEK_QUERY_STRING, NumberParam)[1];
  const setQueryYear = useQueryParam(YEAR_QUERY_STRING, NumberParam)[1];
  const { weekNr, year, updateDate } = useDate();

  const setNextWeek = () => {
    const newDate = DateTime
      .fromObject({ weekYear: year, weekNumber: weekNr })
      .plus({ weeks: 1 });

    updateDate({
      weekNr: newDate.weekNumber,
      year: newDate.weekYear,
    });

    setQueryWeekNr(newDate.weekNumber);
    setQueryYear(newDate.weekYear);
  };

  const setPreviousWeek = () => {
    const newDate = DateTime
      .fromObject({ weekYear: year, weekNumber: weekNr })
      .minus({ weeks: 1 });

    updateDate({
      weekNr: newDate.weekNumber,
      year: newDate.weekYear,
    });

    setQueryWeekNr(newDate.weekNumber);
    setQueryYear(newDate.weekYear);
  };

  const setRealWeek = () => {
    const newDate = {
      weekNr: DateTime.now().weekNumber,
      year: DateTime.now().startOf('week').year,
    };

    updateDate({
      weekNr: DateTime.now().weekNumber,
      year: DateTime.now().startOf('week').year,
    });

    setQueryWeekNr(newDate.weekNr);
    setQueryYear(newDate.year);
  };

  const initQueryString = () => {
    setQueryWeekNr(weekNr);
    setQueryYear(year);
  };

  return {
    setNextWeek,
    setPreviousWeek,
    setRealWeek,
    initQueryString,
  };
};
