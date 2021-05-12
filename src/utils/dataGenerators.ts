// // External imports
import {DateTime} from "luxon";
import { v4 as uuidv4 } from 'uuid';

// Internal imports
import {activitySettings, categorySettings} from "./staticData";

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

/**
 * Creates and returns all the necessary data to start up a new user.
 * @return {{weekid, notes, categories, activitySettings, categorySettings, analytics}}
 */
export const createData = () => {
  const weekid = uuidv4() // Create an id for the new week
  const {notes, categories, analytics} = createBaseData()
  return {weekid, notes, categories, activitySettings, categorySettings, analytics}
}

/**
 * Generates data for a week for a given user and returns it as js objects as well as a Firebase update.
 * @param type 'CURRENT' if create week for current week, else provided weekNr and year is used.
 * @param uid The user id for which to create the week.
 * @param weekNr OPTIONAL. Week number of the week.
 * @param year OPTIONAL. Year of the week.
 * @return {{weekid, notes, categories, updates}} Updates is the Firebase update object.
 */
export const createWeekData = (type, uid, weekNr, year) => {

  if (type === 'CURRENT') {
    let weekNr = DateTime.now().weekNumber
    // It is important to get the year from the start of the current week because there can be a scenario when a week
    // is the last week of a year, however the current year could already be a new year so it would show the last week of the next year.
    let year = DateTime.now().startOf("week").year
  }

  const weekid = uuidv4() // Create an id for the new week
  const {categories, notes} = createBaseData() // Generates base data which is the notes and categories

  const updates = {} // Firebase updates object

  updates[`users/${uid}/weekYearTable/${weekNr}_${year}`] = weekid
  updates[`users/${uid}/categories/${weekid}`] = categories
  updates[`users/${uid}/notes/${weekid}`] = notes

  return {updates, notes, categories, weekid}
}

export const createBaseData = () => {
  // Analytics object initialised
  const analytics = {
    categories: {

    },
    activities: {

    }
  }

  // Initialise all categories from categorySettings to have count 0
  Object.keys(categorySettings).forEach(categid => {
    analytics["categories"][categid] = 0
  })

  // Initialise all activities from activitySettings to have count 0
  Object.keys(activitySettings).forEach(actid => {
    analytics["activities"][actid] = 0
  })

  const notes = []
  let categories = []
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  days.forEach((day, index) => {
    for (var i = 1; i < 97; i++) {
      notes.push({
        day,
        position: i,
        note:'',
        stackid: uuidv4(),
      })
      categories.push({
        day,
        position: i,
        activityid: '',
        categoryid: ''
      })
    }
  })

  return {notes, categories, analytics}
}
