import * as i from 'types';
import * as React from 'react';
import { DateTime, WeekNumbers } from 'luxon';

export const DateContext = React.createContext<i.DateContextType>(undefined);

export const DateProvider: React.FC = ({ children }) => {
  const [weekNr, setWeekNr] = React.useState<WeekNumbers>(DateTime.now().weekNumber);
  const [year, setYear] = React.useState<number>(DateTime.now().startOf('week').year);

  const updateDate: i.DateContextDispatch = ({ weekNr, year }) => {
    const weekNumber = weekNr as any;
    setWeekNr(weekNumber);
    setYear(year);

    return { weekNr: weekNumber, year };
  };

  return (
    <DateContext.Provider
      value={{
        weekNr,
        year,
        updateDate,
        realWeekNr: DateTime.now().weekNumber,
        realYear: DateTime.now().startOf('week').year,
      }}>
      {children}
    </DateContext.Provider>
  );
};
