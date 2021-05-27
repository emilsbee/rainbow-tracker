// External imports
import firebase from "firebase/app";

// Internal imports
import database from "../../firebase/firebase";
import {ActivitySettings, CategorySettings, WeekYearTable} from "./settings";

/**
 * Fetches category settings from Firebase for a given user.
 * @param uid The user id of user for which to fetch category settings.
 * @return Promise Firebase once method.
 */
export const getCategorySettings = (uid):Promise<firebase.database.DataSnapshot> => {
    return database.ref(`users/${uid}/categorySettings`).once('value')
}

/**
 * Fetches activity settings from Firebase for a given user.
 * @param uid The user id of user for which to fetch activity settings.
 * @return Promise Firebase once method.
 */
export const getActivitySettings = (uid):Promise<firebase.database.DataSnapshot> => {
    return database.ref(`users/${uid}/activitySettings`).once('value')
}

/**
 * Saves current activity and category settings in Firebase.
 * @param activitySettings The activity setting object.
 * @param categorySettings The category setting object.
 * @param uid The user id.
 */
export const saveSettings = (activitySettings:ActivitySettings, categorySettings:CategorySettings, uid:string):Promise<any> => {
    const updates = {}
    updates[`users/${uid}/activitySettings`] = activitySettings
    updates[`users/${uid}/categorySettings`] = categorySettings
    return database.ref().update(updates)
}

/**
 * Given the weekYearTable object and a weekid, returns the year and weekNr of the week or null.
 * @param weekYearTable The weekYearTable object.
 * @param weekid The id of week for which to find year and weekNr.
 * @return weekDate as a string in the form weekNr_year.
 */
export const getWeekDateByWeekid = (weekYearTable:WeekYearTable, weekid:string):string => {
    for (let i = 0; i < Object.values(weekYearTable).length; i++) {
        if (Object.values(weekYearTable)[i] === weekid) {
            return Object.keys(weekYearTable)[i]
        }
    }
    return null
}