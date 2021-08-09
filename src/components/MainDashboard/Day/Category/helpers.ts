// Internal imports
import {ActivityType} from "../../../../store/settings/settings";

/**
 * Checks whether a given category has any activities associated to it.
 * @param categoryid The categoryid of category to be checked for activities.
 * @param activityTypes The object containing all activities.
 * @return Boolean indicating whether the category has any activities.
 */
export const hasActivities = (categoryid:string | null, activityTypes:ActivityType[]):boolean => {
    for (let i = 0; i <activityTypes.length; i++) {
        let activityType: ActivityType = activityTypes[i]

        if (activityType.categoryid === categoryid) {
            return true
        }
    }

    return false
}