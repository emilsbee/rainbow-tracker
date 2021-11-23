import * as i from "types";

export const isNewDateAvailable = (availableDates: i.AvailableDate[], year: number, weekNr: number):boolean => {
  let isAvailable = false;

  for (let i = 0; i < availableDates.length; i++) {
    if (availableDates[i].year === year) {
      for (let j = 0; j < availableDates[i].weeks.length; j++) {
        if (availableDates[i].weeks[j] === weekNr) {
          isAvailable = true;
          break;
        }
      }
    }
  }

  return isAvailable;
};
