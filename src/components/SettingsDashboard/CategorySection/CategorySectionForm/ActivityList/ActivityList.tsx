// External imports
import React from "react";

// Internal imports
import {ActivitySettings} from "../../../../../store/settings/settings";
import ActivityListItem from "./ActivityListItem/ActivityListItem";
import {getActivityidByLongName, validateActivitySubmission} from "../../../../../store/categories/helpers";

type ActivityListProps = {
    activitySettings:ActivitySettings,
    categoryid:string,
    setActivitySettings: (activitySettings:ActivitySettings) => void,
    setError: ({message: string, category:boolean}) => void,
}

const ActivityList:React.FC<ActivityListProps> = ({activitySettings, categoryid, setActivitySettings, setError}) => {

    /**
     * Handles event when one of the activity inputs comes out of focus.
     * This function then updates the activity in activity settings and sets it
     * as the activityCategory state in parent component.
     */
    const handleActivityChange = (activity:{activityid:string, long:string, short:string}):void => {
        const {valid, message} = validateActivitySubmission(activity.activityid, activity.long, activity.short, activitySettings)

        if (!valid) {
            setError({message, category: false})
        } else {
            setError({message: "", category: false})
            activitySettings[activity.activityid].short = activity.short
            activitySettings[activity.activityid].long = activity.long
            setActivitySettings(activitySettings)
        }
    }

    return (
        <div>
            {Object.values(activitySettings).map(activitySetting => {

                if (activitySetting.categoryid === categoryid) {
                    return (
                        <ActivityListItem
                            activity={{...activitySetting, activityid: getActivityidByLongName(activitySetting.long, activitySettings)}}
                            key={activitySetting.long}
                            onChange={handleActivityChange}
                        />
                    )
                } else {
                    return null
                }
            })}
        </div>
    )
}

export default ActivityList