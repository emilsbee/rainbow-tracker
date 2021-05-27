// External imports
import {action, Action, Thunk, thunk} from "easy-peasy";
import firebase from "firebase/app";
import {DateTime} from "luxon";

// Internal imports
import database from '../../firebase/firebase'
import store from '../storeSetup'
import {ActivitySettings, CategorySettings} from "../settings/settings";
import {VIEW_MONTH, VIEW_WEEK, VIEW_YEAR} from "../../components/AnalyticsDashboard/constants/constants";

export interface AnalyticsDate {
    year:number,
    weekNr:number,
    month:number
}

export interface AnalyticsModel {
    currentDate:AnalyticsDate,
    /**
     * Goes back in time a given unit of time (week, month or year).
     * @param timeUnit One of the views from src/components/AnalyticsDashboard/constants/constants.ts
     */
    goBackInTime: Action<AnalyticsModel, {timeUnit:string}>,
    /**
     * Goes forward in time a given unit of time (week, month or year).
     * @param timeUnit One of the views from src/components/AnalyticsDashboard/constants/constants.ts
     */
    goForwardInTime: Action<AnalyticsModel, {timeUnit:string}>,
    /**
     * Sets the current date to the real life current date.
     */
    setCurrentDate: Action<AnalyticsModel>,

    stopCategoryListener: Thunk<AnalyticsModel>,
    startCategoryListener: Thunk<AnalyticsModel>,
}

export interface AnalyticsType {
        activities: {
            activityid?:number,
        },
        categories: {
            categoryid?:number
        }
}

export type AnalyticsExtendedType = {
    analytics:AnalyticsType,
    weekid:string,
    year:number,
    weekNr:number
}

const analyticsModel:AnalyticsModel =  {
    currentDate: {
        weekNr: DateTime.now().weekNumber,
        month: DateTime.now().month,
        year: DateTime.now().startOf("week").year
    },
    goBackInTime: action((state, payload) => {
        let timeUnit = payload.timeUnit
        let newDate = {weekNr:0, month: 0, year:0}
        let dt:DateTime

        /* WEEK */
        if (timeUnit === VIEW_WEEK) {

            dt = DateTime.fromObject({
                weekYear: state.currentDate.year,
                weekNumber: state.currentDate.weekNr,
            });

            newDate.year = dt.minus({week: 1}).year
            newDate.month = dt.minus({week: 1}).month
            newDate.weekNr = dt.minus({week: 1}).weekNumber

        /* MONTH */
        } else if (timeUnit === VIEW_MONTH) {

            dt = DateTime.fromObject({
                year: state.currentDate.year,
                month: state.currentDate.month
            });

            newDate.year = dt.minus({month: 1}).year
            newDate.month = dt.minus({month: 1}).month
            newDate.weekNr = dt.minus({month: 1}).weekNumber

        /* YEAR */
        } else if (timeUnit === VIEW_YEAR) {
            dt = DateTime.fromObject({
                weekYear: state.currentDate.year,
                weekNumber: state.currentDate.weekNr
            });

            newDate.year = dt.minus({year: 1}).year
            newDate.month = dt.minus({year: 1}).month
            newDate.weekNr = dt.minus({year: 1}).weekNumber
        }

        state.currentDate = newDate
    }),
    goForwardInTime: action((state, payload) => {
        let timeUnit = payload.timeUnit
        let newDate = {weekNr:0, month: 0, year:0}
        let dt:DateTime

        /* WEEK */
        if (timeUnit === VIEW_WEEK) {

            dt = DateTime.fromObject({
                weekYear: state.currentDate.year,
                weekNumber: state.currentDate.weekNr,
            });

            newDate.year = dt.plus({week: 1}).year
            newDate.month = dt.plus({week: 1}).month
            newDate.weekNr = dt.plus({week: 1}).weekNumber

            /* MONTH */
        } else if (timeUnit === VIEW_MONTH) {

            dt = DateTime.fromObject({
                year: state.currentDate.year,
                month: state.currentDate.month
            });

            newDate.year = dt.plus({month: 1}).year
            newDate.month = dt.plus({month: 1}).month
            newDate.weekNr = dt.plus({month: 1}).weekNumber

            /* YEAR */
        } else if (timeUnit === VIEW_YEAR) {
            dt = DateTime.fromObject({
                weekYear: state.currentDate.year,
                weekNumber: state.currentDate.weekNr
            });

            newDate.year = dt.plus({year: 1}).year
            newDate.month = dt.plus({year: 1}).month
            newDate.weekNr = dt.plus({year: 1}).weekNumber
        }

        state.currentDate = newDate
    }),
    setCurrentDate: action((state) => {
          state.currentDate = {
              weekNr: DateTime.now().weekNumber,
              month: DateTime.now().month,
              year: DateTime.now().startOf("week").year
          }
    }),
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