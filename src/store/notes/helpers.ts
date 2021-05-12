// External imports
import firebase from "firebase/app";

// Internal imports
import database from "../../firebase/firebase";
import {createData} from "../../utils/dataGenerators";

/**
 * Fetches notes from Firebase for a given week and user.
 * @param uid User for which to fetch the notes.
 * @param weekid The weekid of week from which to fetch notes.
 */
export const getNotesByWeekid = (uid, weekid):Promise<firebase.database.DataSnapshot> => {
    return database.ref(`users/${uid}/notes/${weekid}`).once('value')
}

/**
 * Fetches notes from Firebase for a given user using given week number and year.
 * @param uid The user id of user for which to fetch notes.
 * @param weekNr The week number of the week for which to fetch notes.
 * @param year The year of the week for which to fetch notes.
 */
export const getNotesByWeekNrAndYear = async (uid:string, weekNr:string, year:string):Promise<firebase.database.DataSnapshot> => {
    const weekid = await database.ref(`users/${uid}/weekYearTable/${weekNr}_${year}`).once('value')
    return database.ref(`users/${uid}/notes/${weekid.val()}`).once('value')
}

/**
 * Generates and sets notes for a given weekid.
 * @param uid The user for which to set generated notes.
 * @param weekid The weekid of week for which to set the notes.
 */
export const createNotes = (uid:string, weekid:string):Promise<firebase.database.DataSnapshot> => {
    const {notes} = createData()
    const updates = {}
    updates[`users/${uid}/notes/${weekid}`] = notes
    return database.ref().update(updates)
}