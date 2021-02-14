import moment from 'moment'
import {VIEW_WEEK, VIEW_MONTH, VIEW_YEAR} from '../constants/constants'

export function capitalizeFirstLetter(string) {
    string = string.toLowerCase()
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const findCategoryActivities = (categoryid, activitySettings) => {
  let activityids = []

  for (var i = 0; i < Object.keys(activitySettings).length; i++) {
    if (activitySettings[Object.keys(activitySettings)[i]].categoryid === categoryid) {
      activityids.push({
        ...activitySettings[Object.keys(activitySettings)[i]],
        activityid: Object.keys(activitySettings)[i]
      })
    }
  }
  return activityids
}

/**
 * Checks whether a given category has any activities
 * @param {String} categoryid The id of category to check.
 * @param {Object} activitySettings The object containing information about activities and their relations to categories.
 * @returns Whether or not the category has at least one activity.
 */
export const hasActivities = (categoryid, activitySettings) => {

  for (var i = 0; i < Object.keys(activitySettings).length; i++) {
    if (activitySettings[Object.keys(activitySettings)[i]].categoryid === categoryid) {
      return true
    }
  }
  return false
}

/**
 * Since each day is divided in 96 15 minute intervals, this function 
 * returns the total number of those intervals for the given view. So say the view is month,
 * then this returns how many of those intervals are in the current month. 
 * @param {String} view Indicates what kind of a view the dashboard is currently in: week, month, year.
 * @returns The total amount of 15 minute intervals for the given view in the current time period.
 */
export const getMaximumTimeUnits = (view) => {
  if (view === VIEW_WEEK) {
    return 672
  } else if (view === VIEW_MONTH) {
    return moment().daysInMonth()*96
  } else if (view === VIEW_YEAR) {
    return moment().isLeapYear ? 396*96 : 395*96
  }
}