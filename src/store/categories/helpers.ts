// External imports
import firebase from "firebase/app";

// Internal imports
import database from "../../firebase/firebase";
import {createData} from "../../utils/dataGenerators";

/**
 * Fetches categories from Firebase for a given week and user by the weekid.
 * @param uid User for which to fetch the categories.
 * @param weekid The weekid of week from which to fetch categories.
 */
export const getCategoriesByWeekid = (uid:string, weekid:string):Promise<firebase.database.DataSnapshot> => {
    return database.ref(`users/${uid}/categories/${weekid}`).once('value')
}

/**
 * Fetches categories from Firebase for a given user using given week number and year.
 * @param uid The user id of user for which to fetch categories.
 * @param weekNr The week number of the week for which to fetch categories.
 * @param year The year of the week for which to fetch categories.
 */
export const getCategoriesByWeekNrAndYear = async (uid:string, weekNr:string, year:string):Promise<firebase.database.DataSnapshot> => {
    const weekid = await database.ref(`users/${uid}/weekYearTable/${weekNr}_${year}`).once('value')
    return database.ref(`users/${uid}/categories/${weekid.val()}`).once('value')
}

/**
 * Generates and sets categories for a given weekid.
 * @param uid The user for which to set generated categories.
 * @param weekid The weekid of week for which to set the categories.
 */
export const createCategories = (uid:string, weekid:string):Promise<firebase.database.DataSnapshot> => {
    const {categories} = createData()
    const updates = {}
    updates[`users/${uid}/categories/${weekid}`] = categories
    return database.ref().update(updates)
}
