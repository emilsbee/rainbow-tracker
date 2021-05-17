// External imports
import React from "react";

// Internal imports
import {ActivitySettings} from "../../../../../store/settings/settings";
import ActivityListItem from "./ActivityListItem/ActivityListItem";
import {getActivityidByLongName, validateActivitySubmission} from "../../../../../store/categories/helpers";
import {useStoreActions} from "../../../../../store/hookSetup";

type ActivityListProps = {
    activitySettings:ActivitySettings,
    categoryid:string,
    setError: ({message: string}) => void,
}

const ActivityList:React.FC<ActivityListProps> = ({activitySettings, categoryid, setError}) => {
    // Store actions
    const setActivitySettings = useStoreActions(actions => actions.settings.setActivitySettings)

    /**
     * Handles event when one of the activity inputs comes out of focus.
     * This function then updates the activity in activity settings and sets it
     * as the activityCategory state in parent component.
     */
    const handleActivityChange = (activity:{activityid:string, long:string, short:string}):void => {
        const {valid, message} = validateActivitySubmission(activity.long, activity.short)

        if (valid) {
            activitySettings[activity.activityid].short = activity.short
            activitySettings[activity.activityid].long = activity.long
            setActivitySettings({activitySettings})
            setError({message: ""})
        } else {
            setError({message})
        }
    }

    return (
        <div>
            {Object.values(activitySettings).map(activitySetting => {

                if (activitySetting.categoryid === categoryid) {
                    return (
                        <ActivityListItem
                            activity={{...activitySetting, activityid: getActivityidByLongName(activitySetting.long, activitySettings, categoryid)}}
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