/**
 * Generates the time values displayed on the left side
 * of main dashboard.
 * @return timeSlots Array of formatted time values starting at midnight and progressing in time in 15 minutes intervals.
 */
export const timeValues = ():string[] => {
  const n = ["00", "15", "30", "45"];
  const m = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23",];
  let timeSlots = [];

  for (let i in m) {
    for (let j in n) {
      timeSlots.push(`${m[i]}:${n[j]}`);
    }
  }

  return timeSlots;
};

