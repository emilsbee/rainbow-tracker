// External imports
import database from "../../../firebase/firebase";
import { v4 as uuidv4 } from 'uuid';

// Internal imports
import {createCategories} from "../../../store/categories/helpers";
import {createNotes} from "../../../store/notes/helpers";

/**
 * If a given week doesnt exist, it is created.
 * @param uid
 * @param currentWeekNr
 * @param currentYear
 */
export const createMainDashboardContext = async (uid:string, currentWeekNr:string, currentYear:string) => {
    let weekid = await database.ref(`users/${uid}/weekYearTable/${currentWeekNr}_${currentYear}`).once('value')

    if (weekid.val() == null) { // If given week doesn't exist
        let newWeekid = uuidv4()

        await createCategories(uid, newWeekid)
        await createNotes(uid, newWeekid)
        let updates = {}
        updates[`users/${uid}/weekYearTable/${currentWeekNr}_${currentYear}`] = newWeekid
        return database.ref().update(updates)
    }
}