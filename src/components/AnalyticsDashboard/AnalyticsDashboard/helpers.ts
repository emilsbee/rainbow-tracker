// External imports

// Internal imports
import {VIEW_WEEK, VIEW_MONTH, VIEW_YEAR} from '../constants/constants'
import {AnalyticsDate, AnalyticsExtendedType, AnalyticsType} from "../../../store/analytics/analytics";
import {DateTime} from "luxon";

/**
 * Returns data from analytics object for a specific view.
 * @param view The view.
 * @param date Date.
 * @param analytics Analytics object for a year.
 * @return analytics array.
 */
export const getDataToDisplay = (view:string, date:AnalyticsDate, analytics:AnalyticsExtendedType[]):AnalyticsType => {
    const dataToDisplay = []

    if (view === VIEW_WEEK) {

        for (let i = 0; i < analytics.length; i++) {
            if (analytics[i].weekNr === date.weekNr) {
                dataToDisplay.push(analytics[i])
            }
        }

    } else if (view === VIEW_MONTH) {
        for (let i = 0; i < analytics.length; i++) {
            let dt = DateTime.fromObject({
                weekYear: analytics[i].year,
                weekNumber: analytics[i].weekNr,
            });

            if (dt.month === date.month) {
                dataToDisplay.push(analytics[i])
            }
        }
    } else if (view === VIEW_YEAR) {
        for (let i = 0; i < analytics.length; i++) {
            if (analytics[i].year === date.year) {
                dataToDisplay.push(analytics[i])
            }
        }
    }

    return flattenDataToDisplay(dataToDisplay)
}

/**
 * Given an array of week analytics, flattens this array to a single object aggregating
 * the category and activity analytics.
 * @param analytics analytics extended object.
 * @return Aggregated analytics.
 */
export const flattenDataToDisplay = (analytics:AnalyticsExtendedType[]):AnalyticsType => {
    let returnObj:AnalyticsType = {
        categories: {

        },
        activities: {

        }
    }

    analytics.forEach(analytic => {

        // Categories
        Object.keys(analytic.analytics.categories).forEach(categoryid => {

            if (!returnObj.categories[categoryid]) { // If the categoryid doesn't yet exist in returnObj
                returnObj.categories[categoryid] = analytic.analytics.categories[categoryid]
            } else { // If the categoryid does already exist in returnObj
                returnObj.categories[categoryid] += analytic.analytics.categories[categoryid]
            }

        })

        // Analytics
        Object.keys(analytic.analytics.activities).forEach(activityid => {

            if (!returnObj.activities[activityid]) { // If the activityid doesn't yet exist in returnObj
                returnObj.activities[activityid] = analytic.analytics.activities[activityid]
            } else { // If the categoryid does already exist in returnObj
                returnObj.activities[activityid] += analytic.analytics.activities[activityid]
            }

        })
    })

    return returnObj
}
