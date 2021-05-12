// // External imports
// import {DateTime} from "luxon";
// import { v4 as uuidv4 } from 'uuid';
// import moment from 'moment'
//
// // Internal imports
// import store from "../store/storeSetup";
// import database from "../firebase/firebase";
//
// /**
//  * Generates necessary default data for a new user in Firebase.
//  * @param uid The uid of the user.
//  * @param weekNr The weekNr to use for the first week.
//  * @param year The year to use for the first week.
//  * @return {Promise<firebase.database.DataSnapshot>}
//  */
// const generateNewUser = (uid, weekNr, year) => {
//     const {weekid, notes, categories, activitySettings, categorySettings, analytics} = createData()
//
//     const updates = {}
//     updates[`users/${uid}/activitySettings`] = activitySettings
//     updates[`users/${uid}/categorySettings`] = categorySettings
//     updates[`users/${uid}/init`] = true
//     updates[`users/${uid}/weekYearTable/${weekNr}_${year}`] = weekid
//     updates[`users/${uid}/categories/${weekid}`] = categories
//     updates[`users/${uid}/notes/${weekid}`] = notes
//     updates[`users/${uid}/analytics/${weekid}`] = analytics
//
//     return database.ref().update(updates)
// }
//
// /**
//  * Method that determines whether a new account is signing in or an existing one. Then handles
//  * the necessary context setup for the user, like for a new user populates the data for their first week.
//  * For an existing user, checks whether they have the current week in Firebase, if not then creates it. Also, sets
//  * the current date in the store.
//  */
// export const initializeUser = () => {
//     // Store actions
//     const setDate = store.getActions().settings.setDate
//     store.getActions().analytics.startCategoryListener()
//
//     // Store state
//     const uid = store.getState().auth.uid
//
//     const weekNr = DateTime.now().weekNumber
//     // It is important to get the year from the start of the current week because there can be a scenario when a week
//     // is the last week of a year, however the current year could already be a new year so it would show the last week of the next year.
//     const year = DateTime.now().startOf("week").year
//     setDate({date: {weekNr: weekNr.toString(), year: year.toString()}})
//
//     return database.ref(`users/${uid}/init`).once("value")
//         .then(hasData => {
//             if (hasData.val() === null) { // If new account
//
//                 return generateNewUser(uid, weekNr, year)
//
//             }
//             // If existing account, then check if the current week is in Firebase.
//             // If it isn't, then create a new week.
//             else {
//                 return database.ref(`users/${uid}/weekYearTable/${weekNr}_${year}`).once('value')
//                     .then(currentWeek => {
//                         if (currentWeek.val() === null) { // Current week does not exists
//
//                             const {weekid, notes, categories} = createData()
//
//                             const updates = {}
//                             updates[`users/${uid}/weekYearTable/${weekNr}_${year}`] = weekid
//                             updates[`users/${uid}/categories/${weekid}`] = categories
//                             updates[`users/${uid}/notes/${weekid}`] = notes
//                             return database.ref().update(updates)
//                         }
//                     })
//             }
//         })
// }
//
//
