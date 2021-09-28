// External imports
import React from "react";

// Internal imports
import './activity-list-item.scss'
import {ActivityType} from "../../../../store/settings/settings";

type ActivityListItemProps = {
    activity: ActivityType,
    onChange: (activity:ActivityType) => void
}

const ActivityListItem:React.FC<ActivityListItemProps> = ({activity, onChange}) => {
    const [longValue, setLongValue] = React.useState(activity.long)
    const [shortValue, setShortValue] = React.useState(activity.short)

    /**
     * Handles when one of the inputs comes out of focus.
     * When that happens this function updates the activity setting
     * state in parent component.
     */
    const handleFocusOut = () => {
        onChange({
            long: longValue,
            short: shortValue,
            activityid: activity.activityid,
            categoryid: activity.categoryid,
            archived: activity.archived,
            userid: activity.userid
        })
    }

    return (
        <div id={"activity-list-item-container"}>
            <div id={"activity-list-item-input-container"}>
                <input
                    type={"text"}
                    value={longValue}
                    onChange={(e) => setLongValue(e.target.value)}
                    id={"activity-list-item-long-input"}
                    onBlur={handleFocusOut}
                    maxLength={40}
                />
                -
                <input
                    type={"text"}
                    value={shortValue}
                    onChange={(e) => setShortValue(e.target.value)}
                    id={"activity-list-item-short-input"}
                    onBlur={handleFocusOut}
                    maxLength={2}
                />
            </div>
        </div>
    )
}

export default ActivityListItem