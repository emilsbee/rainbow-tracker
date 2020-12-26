// External imports
import { action, thunk } from "easy-peasy";
import moment from 'moment'

// Internal imports
import database from '../../components/firebase/firebase'
import { store } from '../../index'
import { getCurrentYearWeekIds, createSortedYearObject } from './helpers'

const analyticsModel =  {
    weekYearTable: [],
    categories: [],

    setcategories: action((state, payload) => {
        state.categories = payload.categories
    }),
    setWeekYearTable: action((state, payload) => {
        state.weekYearTable = payload.weekYearTable
    }),
    
    getCategories: thunk( async (actions, payload) => {   
        const uid = store.getState().auth.uid 
        const year = payload.year
        const weekYearTable = await database.ref(`users/${uid}/weekYearTable`).once('value')
        actions.setWeekYearTable({weekYearTable: weekYearTable.val()})

        const weekids = getCurrentYearWeekIds(weekYearTable.val(), year)
        var weeks = []
        
        Promise.all(
            weekids.map(weekid => database.ref(`users/${uid}/analytics/${weekid}`).once('value'))
        ).then((data) => {
            data.forEach((week, index) => {
                weeks.push({...week.val(), weekid: weekids[index]})
            })
            
            actions.setcategories({categories: createSortedYearObject(weeks, year, weekYearTable.val())})
        })
    }),
    stopCategoryListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid 

        await database.ref(`users/${uid}/categories/`).off()
    }),

    // Recounts the activities and categories for the current week.
    // This recounting happens after every change in categories in one of the weeks.
    startCategoryListener: thunk( async (actions, payload) => {
        const uid = store.getState().auth.uid 

        database.ref(`users/${uid}/categories/`).on('child_changed', async (data) => {
      
            let weekid = data.ref.path.pieces_[3]
     
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
            
            // Iterates over all 15 minute intervals in a week. In this loop the counting happens.
            data.val().forEach(interval => {
                
                if (interval.activityid !== "") { // If there is an activityid in this interval

                    if (!analytics.activities[interval.activityid]) { // If such activityid is not yet present in analyitics object
                        
                        analytics.activities[interval.activityid] = 1

                    } else { // If such activityid is already in the analytics object

                        let activityCount = analytics.activities[interval.activityid]
                        activityCount += 1
                        analytics.activities[interval.activityid] = activityCount
                    
                    }
                }

                if (interval.categoryid !== "") { // If there is an categoryid in this interval
                    
                    if (!analytics.categories[interval.categoryid]) { // If such categoryid is not yet present in analyitics object

                        analytics.categories[interval.categoryid] = 1
                    
                    } else { // If such categoryid is already in the analytics object

                        let categoryCount = analytics.categories[interval.categoryid]
                        categoryCount += 1
                        analytics.categories[interval.categoryid] = categoryCount

                    }
                }
            })

            await database.ref(`users/${uid}/analytics/${weekid}`).set(analytics) // Updates the current week's analytics
        })
    })
}

export default analyticsModel