// External imports
import firebase from "firebase/app";

// Internal imports
import database from "../../firebase/firebase";
import {ActivitySettings, CategorySettings} from "./settings";

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
    console.log(activitySettings)
    const updates = {}
    updates[`users/${uid}/activitySettings`] = activitySettings
    updates[`users/${uid}/categorySettings`] = categorySettings
    return database.ref().update(updates)
}

/**
 * Finds activities of a given category and returns them or returns null.
 * @param categoryid Categoryid of the category for which to find activities.
 * @param activitySettings Current state activity settings in which to look.
 * @return ActivitySettings Activities of a category.
 */
export const getCategoryActivities = (categoryid:string, activitySettings:ActivitySettings):ActivitySettings | null => {
    let categoryActivities:any = {};
    const activityIds = Object.keys(activitySettings)

    for (let i = 0; i < activityIds.length; i++) {
        let activityid = activityIds[i]

        if (activitySettings[activityid].categoryid === categoryid) {
            categoryActivities[activityid] = activitySettings[activityid]
        }
    }

    return categoryActivities
}