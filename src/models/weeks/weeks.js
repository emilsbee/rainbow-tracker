// External imports
import { thunk } from 'easy-peasy'
import { store } from '../../index'
import database from '../../firebase/firebase'

// Internal imports
import { createWeekData } from '../initialise/helpers'
import { getMonthDateRange } from './helpers'

const weeksModel = {
    nextWeek: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        const currentWeekNr = parseInt(payload.currentWeekNr)
        const currentYear = parseInt(payload.currentYear)
        
        // Set notes and categories to empty arrays to start the loading screen.
        // This is because in mainDashboardTable checks if the arrays are empty and shows loading
        const setCategories = store.getActions().activities.setCategories
        const setNotes = store.getActions().notes.setNotes
        setNotes({notes: []})
        setCategories({categories: []})

        const nextWeekNr = currentWeekNr+1
        
        const weeksInCurrentYear = getMonthDateRange(currentYear, 12).end.isoWeek() // Gets the number of weeks in the current year

        var nextWeekid;

        if (currentWeekNr !== weeksInCurrentYear) { // If current week isn't last week of the year
        
            nextWeekid = await database.ref(`users/${uid}/weekYearTable/${nextWeekNr}_${currentYear}`).once('value') // Fetches weekid of current week

            if (nextWeekid.val() === null) { // If the next week doesn't exist 

                actions.createWeek({weekNr: nextWeekNr, year: currentYear})

            } else { // If the next week does exist

                actions.getWeek({ weekid: nextWeekid.val(), weekNr: nextWeekNr, year: currentYear })

            }

        } else { // If current week is last week of the year

            nextWeekid = await database.ref(`users/${uid}/weekYearTable/1_${currentYear+1}`).once('value') // Fetches weekid of current week

            if (nextWeekid.val() === null) { // If the next week doesn't exist 

                actions.createWeek({weekNr: 1, year: currentYear+1})

            } else { // If the next week does exist

                actions.getWeek({ weekid: nextWeekid.val(), weekNr: 1, year: currentYear+1 })

            }
        }
    }),

    previousWeek: thunk( async (actions, payload) => {
        const uid = store.getState().auth.uid
        const currentWeekNr = parseInt(payload.currentWeekNr)
        const currentYear = parseInt(payload.currentYear)

        // Set notes and categories to empty arrays to start the loading screen.
        // This is because in mainDashboardTable checks if the arrays are empty and shows loading
        const setCategories = store.getActions().activities.setCategories
        const setNotes = store.getActions().notes.setNotes
        setNotes({notes: []})
        setCategories({categories: []})

        var previousWeekNr;

        var previousWeekid;


        if (currentWeekNr === 1) { // If current week is first week of year 

            const weeksInPreviousYear = getMonthDateRange(currentYear-1, 12).end.isoWeek() // Gets the number of weeks in the previous year

            previousWeekNr = weeksInPreviousYear // Sets the previous weeks week number to previous years final week

            previousWeekid = await database.ref(`users/${uid}/weekYearTable/${previousWeekNr}_${currentYear-1}`).once('value') // Fetches weekid of current week

            if (previousWeekid.val() === null) { // If the previous week doesn't exist 

                actions.createWeek({weekNr: previousWeekNr, year: currentYear-1})

            } else { // If the previous week does exist

                actions.getWeek({ weekid: previousWeekid.val(), weekNr: previousWeekNr, year: currentYear-1 })

            }


        } else { // If current week is not the first week of the year

            previousWeekNr = currentWeekNr-1

            previousWeekid = await database.ref(`users/${uid}/weekYearTable/${previousWeekNr}_${currentYear}`).once('value') // Fetches weekid of current week

            if (previousWeekid.val() === null) { // If the previous week doesn't exist 

                actions.createWeek({weekNr: previousWeekNr, year: currentYear})

            } else { // If the previous week does exist

                actions.getWeek({ weekid: previousWeekid.val(), weekNr: previousWeekNr, year: currentYear })

            }
        }
    }),


    createWeek: thunk( async (actions, payload) => {
        const uid = store.getState().auth.uid
        const setCategories = store.getActions().activities.setCategories
        const setNotes = store.getActions().notes.setNotes
        const setDate = store.getActions().settings.setDate

        const weekNr = payload.weekNr
        const year = payload.year

        const {updates, notes, categories, weekid} = createWeekData("NOT_CURRENT", uid, weekNr, year) 
        
        // Analytics object initialised
        const analytics = {
            categories: {
                
            }, 
            activities: {
                
            }
        } 

        const activitySettings = store.getState().settings.activitySettings
        const categorySettings = store.getState().settings.categorySettings

        // Initialise all categories from categorySettings to have count 0
        Object.keys(categorySettings).forEach(categid => {
            analytics["categories"][categid] = 0
        })

        // Initialise all activities from activitySettings to have count 0
        Object.keys(activitySettings).forEach(actid => {
            analytics["activities"][actid] = 0
        })

        updates[`users/${uid}/analytics/${weekid}/`] = analytics

        await database.ref().update(updates)
        
        setNotes({notes})
        setCategories({categories})
        setDate({date: {weekNr, year}})
    }),

    getWeek: thunk( async (actions, payload) => {
        const uid = store.getState().auth.uid
        const setCategories = store.getActions().activities.setCategories
        const setNotes = store.getActions().notes.setNotes
        const setDate = store.getActions().settings.setDate


        const weekNr = payload.weekNr
        const year = payload.year
        var weekid;
        
        // Checks if weekid is provided alreay to skip fetching it.
        // For example, nextWeek and previousWeek already fectch the weekid
        // so they just pass it on. But in mainDashboardNavBar when pressing
        // to current week button does not have the weekid available of the week.
        if (payload.weekid) {
            weekid = payload.weekid
        } else {
            weekid = await database.ref(`users/${uid}/weekYearTable/${weekNr}_${year}`).once('value')
            weekid = weekid.val()
        }
        const notes = await database.ref(`users/${uid}/notes/${weekid}`).once('value')
        const categories = await database.ref(`users/${uid}/categories/${weekid}`).once('value')
        
        setNotes({notes: notes.val()})
        setCategories({categories: categories.val()})
        setDate({date: {weekNr, year}})
    })
}

export default weeksModel