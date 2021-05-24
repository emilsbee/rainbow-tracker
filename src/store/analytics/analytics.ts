// External imports
import {Thunk, thunk} from "easy-peasy";
import firebase from "firebase/app";

// Internal imports
import database from '../../firebase/firebase'
import store from '../storeSetup'
import { getCurrentYearWeekIds, createSortedYearObject } from './helpers'
import {ActivitySettings, CategorySettings} from "../settings/settings";

export interface AnalyticsModel {
    stopCategoryListener: Thunk<AnalyticsModel>,
    startCategoryListener: Thunk<AnalyticsModel>
}

export interface AnalyticsType {
        activities: {
            activityid?:number,
        },
        categories: {
            categoryid?:number
        }
}

const analyticsModel:AnalyticsModel =  {
    stopCategoryListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid

        await database.ref(`users/${uid}/categories/`).off()
    }),

    // Recounts the activities and categories for the current week.
    // This recounting happens after every change in categories in one of the weeks.
    startCategoryListener: thunk( async (actions, payload) => {
        const uid = store.getState().auth.uid

        database.ref(`users/${uid}/categories/`).on('child_changed', async (data:firebase.database.DataSnapshot) => {
            let weekid = data.key

            // Analytics object initialised
            const analytics:AnalyticsType = {
                categories: {
                    
                }, 
                activities: {
                    
                }
            } 

            const activitySettings:ActivitySettings = store.getState().settings.activitySettings
            const categorySettings:CategorySettings = store.getState().settings.categorySettings

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