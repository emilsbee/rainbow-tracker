import * as React from 'react';
import { DateTime } from 'luxon';

import { DateContext } from './context';

export const useDate = () => {
  const context = React.useContext(DateContext);
  if (context === undefined) {
    throw new Error('useDate must be used within a DateProvider');
  }
  return context;
};

export const useDateActions = () => {
  const { weekNr, year, updateDate } = useDate();

  const setNextWeek = () => {
    const newDate = DateTime
      .fromObject({ weekYear: year, weekNumber: weekNr })
      .plus({ weeks: 1 });

    updateDate({
      weekNr: newDate.weekNumber,
      year: newDate.weekYear,
    });
  };

  const setPreviousWeek = () => {
    const newDate = DateTime
      .fromObject({ weekYear: year, weekNumber: weekNr })
      .minus({ weeks: 1 });

    updateDate({
      weekNr: newDate.weekNumber,
      year: newDate.weekYear,
    });
  };

  const setRealWeek = () => {
    updateDate({
      weekNr: DateTime.now().weekNumber,
      year: DateTime.now().startOf('week').year,
    });
  };

  return {
    setNextWeek,
    setPreviousWeek,
    setRealWeek,
  };
};
