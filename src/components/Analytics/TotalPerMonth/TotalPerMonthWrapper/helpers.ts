import * as i from "types";

export const isNewMonthDateAvailable = (availableMonths: i.AvailableMonth[], year: number, month: number):boolean => {
  let isAvailable = false;

  for (let i = 0; i < availableMonths.length; i++) {
    if (availableMonths[i].year === year && availableMonths[i].month === month) {
      isAvailable = true;
    }
  }

  return isAvailable;
};
