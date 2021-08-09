// External imports
import React from "react";

// Internal imports
import {ActivityType} from "../../../../../store/settings/settings";
import ActivityListItem from "./ActivityListItem/ActivityListItem";
import {validateActivitySubmission} from "../../../../../store/categories/helpers";
import {useStoreActions} from "../../../../../store/hookSetup";

type ActivityListProps = {
    activityTypes:ActivityType[],
    categoryid:string,
    setError: ({message}:{message:string}) => void,
}

const ActivityList:React.FC<ActivityListProps> = ({activityTypes, categoryid, setError}) => {
    // Store actions
    const updateActivityTypes = useStoreActions(actions => actions.settings.updateActivityType)

    /**
     * Handles event when one of the activity inputs comes out of focus.
     * This function then updates the activity in activity types and sets it
     * as the activityCategory state in parent component.
     */
    const handleActivityChange = (activityType:ActivityType):void => {
        const {valid, message} = validateActivitySubmission(activityType.long, activityType.short)

        if (valid) {
            updateActivityTypes({activityType: activityType})
            setError({message: ""})
        } else {
            setError({message})
        }
    }

    return (
        <div>
            {activityTypes.map(activityType => {
                if (activityType.categoryid === categoryid) {
                    return (
                        <ActivityListItem
                            key={activityType.activityid}
                            activity={activityType}
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