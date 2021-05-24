// External imports
import firebase from "firebase/app";

// Internal imports
import database from "../../firebase/firebase";
import {createData} from "../../utils/dataGenerators";
import {ActivitySettings, CategorySettings} from "../settings/settings";

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
 * Generates and sets categories for a given weekid in firebase.
 * @param uid The user for which to set generated categories.
 * @param weekid The weekid of week for which to set the categories.
 */
export const createCategories = (uid:string, weekid:string):Promise<firebase.database.DataSnapshot> => {
    const {categories} = createData()
    const updates = {}
    updates[`users/${uid}/categories/${weekid}`] = categories
    return database.ref().update(updates)
}

/**
 * Finds the category id from category settings for a given category name.
 * @param categoryName The name of the category for which to find id.
 * @param categorySettings The category settings object.
 * @return Undefined or category id.
 */
export const getCategoryidByName = (categoryName:string, categorySettings:CategorySettings):string => {
    return Object.keys(categorySettings).find(categoryid => categorySettings[categoryid].category === categoryName)
}

/**
 * Finds the activity id from activity settings for a given activity name and categoryid.
 * @param activityLong The long nae of activity for which to find id.
 * @param activitySettings The activity settings object.
 * @param categoryid The categoryid to which the activity belongs.
 * @return Undefined or activity id.
 */
export const getActivityidByLongName = (activityLong:string, activitySettings:ActivitySettings, categoryid:string):string => {
    return Object.keys(activitySettings).find(activityid => activitySettings[activityid].long === activityLong && activitySettings[activityid].categoryid === categoryid)
}

/**
 * Validates submission of new category. Checks the general string constraints for name and color.
 * Also, validates that all categories in the category setting object have unique names.
 * @param categoryid The categoryid of category to be checked.
 * @param name The name of the category.
 * @param color The color of the category.
 * @param categorySettings Category settings object.
 * @return {valid, message} Valid indicates whether input is valid, and message is present if the input is invalid.
 */
export const validateCategorySubmission = (categoryid:string, name:string, color:string, categorySettings:CategorySettings):{valid:boolean, message:string} => {
    let returnVal = {valid:true, message:""}

    if (!name || name.trim().length <= 0 || name.trim().length > 18) {
        returnVal.valid = false
        returnVal.message = "You must provide a category name of length 1-18."
    } else if (!color || color.length <= 0 || color.length > 7) {
        returnVal.valid = false
        returnVal.message = "You must provide a valid hex color value."
    } else {
        for (let i = 0; i < Object.keys(categorySettings).length; i++) {

            if (name === categorySettings[Object.keys(categorySettings)[i]].category && categoryid !== Object.keys(categorySettings)[i]) {
                returnVal.valid = false
                returnVal.message = `Given category name is a duplicate.`
                return returnVal
            }
        }
    }
    return returnVal
}

/**
 * Validates submission of new activity. Checks the general string constraints for long name and short name.
 * @param long The long name of activity.
 * @param short The short name of activity.
 * @return {valid, message} Valid indicates whether input is valid, and message is present if the input is invalid.
 */
export const validateActivitySubmission = (long:string, short:string):{valid:boolean, message:string} => {
    let returnVal = {valid:true, message:""}

    if (!long || long.trim().length <= 0 || long.trim().length > 40) {
        returnVal.valid = false
        returnVal.message = "Activity long name must be of length 1-18."
    } else if (!short || short.length <= 0 || short.length > 2) {
        returnVal.valid = false
        returnVal.message = "Activity short name must be of length 1-2."
    }
    return returnVal
}

// /**
//  * Validates submission of new activity. Checks the general string constraints for long name and short name.
//  * Also, validates that all long names and short names in the activity setting object are unique.
//  * @param activityid The activity id of the activity.
//  * @param long The long name of activity.
//  * @param short The short name of activity.
//  * @param activitySettings The activity settings object.
//  */
// export const validateActivitySubmission = (activityid:string, long:string, short:string, activitySettings:ActivitySettings):{valid:boolean, message:string} => {
//     let returnVal = {valid:true, message:""}
//
//     if (!long || long.trim().length <= 0 || long.trim().length > 40) {
//         returnVal.valid = false
//         returnVal.message = "Activity long name must be of length 1-18."
//     } else if (!short || short.length <= 0 || short.length > 2) {
//         returnVal.valid = false
//         returnVal.message = "Activity short name must be of length 1-2."
//     } else {
//         for (let i = 0; i < Object.keys(activitySettings).length; i++) {
//             let currentActivityid = Object.keys(activitySettings)[i]
//
//             if ((long === activitySettings[currentActivityid].long || short === activitySettings[currentActivityid].short) && activityid !== currentActivityid) {
//                 returnVal.valid = false
//                 returnVal.message = `Given long or short activity name is a duplicate.`
//                 return returnVal
//             }
//         }
//     }
//
//     return returnVal
// }