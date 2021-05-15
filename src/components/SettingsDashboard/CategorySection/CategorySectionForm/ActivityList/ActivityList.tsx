// External imports
import React from "react";
import {ActivitySettings} from "../../../../../store/settings/settings";
import ActivityListItem from "./ActivityListItem/ActivityListItem";
import {getActivityidByLongName} from "../../../../../store/categories/helpers";

// Internal imports

type ActivityListProps = {
    activitySettngs:ActivitySettings,
    categoryid:string
}

const ActivityList:React.FC<ActivityListProps> = ({activitySettngs, categoryid}) => {

    return (
        <div>
            {Object.values(activitySettngs).map(activitySetting => {

                if (activitySetting.categoryid === categoryid) {
                    return (
                        <ActivityListItem
                            activity={{...activitySetting, activityid: getActivityidByLongName(activitySetting.long, activitySettngs)}}
                            key={activitySetting.long}
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