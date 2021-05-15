// External imports
import React from "react";

// Internal imports
import './activity-list-item.scss'

type ActivityListItemProps = {
    activity: {activityid, categoryid, long, short}
}

const ActivityListItem:React.FC<ActivityListItemProps> = ({activity}) => {
    const [longValue, setLongValue] = React.useState(activity.long)
    const [shortValue, setShortValue] = React.useState(activity.short)

    return (
        <div id={"activity-list-item-container"}>
            <div id={"activity-list-item-input-container"}>
                <input
                    type={"text"}
                    value={longValue}
                    onChange={(e) => setLongValue(e.target.value)}
                    id={"activity-list-item-long-input"}
                />
                -
                <input
                    type={"text"}
                    value={shortValue}
                    onChange={(e) => setShortValue(e.target.value)}
                    id={"activity-list-item-short-input"}
                />
            </div>
        </div>
    )
}

export default ActivityListItem