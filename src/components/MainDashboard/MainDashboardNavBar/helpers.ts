// External imports
import { DateTime } from "luxon";

// Internal imports
import { Date } from "../../../store/settings/settings";

export const getPreviousWeek = (currentWeekNr: number, currentYear: number):Date => {
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

export const getNextWeek = (currentWeekNr: number, currentYear: number):Date => {
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

export const getCurrentWeek = ():Date => {
  return  {
    weekNr: DateTime.now().weekNumber,
    year: DateTime.now().startOf("week").year,
  };
};
