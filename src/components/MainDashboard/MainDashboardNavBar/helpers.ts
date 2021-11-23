import * as i from "types";
import { DateTime } from "luxon";

export const getPreviousWeek = (currentWeekNr: number, currentYear: number): i.Date => {
  let newWeekNr, newYear;

  if (currentWeekNr === 1) { // If current week is first week of the year
    newYear = currentYear - 1;
    newWeekNr = DateTime.fromObject({ weekYear: newYear }).weeksInWeekYear;
  } else {
    newWeekNr = currentWeekNr - 1;
    newYear = currentYear;
  }

  return { weekNr: newWeekNr, year: newYear };
};

export const getNextWeek = (currentWeekNr: number, currentYear: number): i.Date => {
  const weeksInCurrentYear = DateTime.fromObject({ weekYear: currentYear }).weeksInWeekYear;

  let newWeekNr, newYear;

  if (weeksInCurrentYear === currentWeekNr) { // If the current week is the last week of the year
    newWeekNr = 1;
    newYear = currentYear + 1;
  } else {
    newWeekNr = currentWeekNr + 1;
    newYear = currentYear;
  }

  return  { weekNr: newWeekNr, year: newYear };
};

export const getCurrentWeek = (): i.Date => {
  return  {
    weekNr: DateTime.now().weekNumber,
    year: DateTime.now().startOf("week").year,
  };
};
