// Internal imports
import {ActivitySettings} from "../../../../store/settings/settings";

/**
 * Checks whether a given category has any activities associated to it.
 * @param categoryid The categoryid of category to be checked for activities.
 * @param activitySettings The object containing all activities.
 * @return Boolean indicating whether the category has any activities.
 */
export const hasActivities = (categoryid:string, activitySettings:ActivitySettings):boolean => {
    let exists = false
    Object.keys(activitySettings).forEach(activityid => {
        if (activitySettings[activityid].categoryid === categoryid) {
            exists = true
        } 
    })
    return exists
}