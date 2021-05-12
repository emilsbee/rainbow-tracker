// External imports
import firebase from "firebase/app";

// Internal imports
import database from "../../firebase/firebase";

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
