// External imports
import React from "react";

// Internal imports
import './activity-list-item.scss'
import {ActivityType} from "../../../../store/settings/settings";
import {ReactComponent as Remove} from "../../../../svgIcons/close.svg";
import {archiveActivityType, restoreActivityType} from "../../../../dao/settingsDao";
import {useStoreActions, useStoreState} from "../../../../store/hookSetup";
import {ReactComponent as Restore} from "../../../../svgIcons/undo.svg";

type ActivityListItemProps = {
    activity: ActivityType,
    onChange: (activity:ActivityType) => void
    viewArchived: boolean
}

const ActivityListItem:React.FC<ActivityListItemProps> = ({activity, onChange, viewArchived}) => {
    // Store state
    const userid = useStoreState(state => state.auth.uid)

    // Store actions
    const archiveActivityTypeLocally = useStoreActions(actions => actions.settings.archiveActivityType)
    const restoreActivityTypeLocally = useStoreActions(actions => actions.settings.restoreActivityType)

    // Local state
    const [longValue, setLongValue] = React.useState<string>(activity.long)
    const [shortValue, setShortValue] = React.useState<string>(activity.short)
    const [hovering, setHovering] = React.useState<boolean>(false)

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

    /**
     * Handles activity type archiving.
     */
    const handleArchiveActivity = async () => {
        const success = await archiveActivityType(userid, activity.activityid)
        if (success) {
            archiveActivityTypeLocally({activityType: activity})
        }
    }

    /**
     * Handles activity restoring.
     */
    const handleRestoreActivity = async () => {
        const success = await restoreActivityType(userid, activity.activityid)
        if (success) {
            restoreActivityTypeLocally({activityType: activity})
        }
    }

    return (
        <div id={"activity-list-item-container"} onMouseOver={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
            <div id={"activity-list-item-input-container"}>
                <input
                    type={"text"}
                    value={longValue}
                    onChange={(e) => setLongValue(e.target.value)}
                    id={"activity-list-item-long-input"}
                    onBlur={handleFocusOut}
                    maxLength={40}
                    style={{opacity: activity.archived ? 0.5 : 1}}
                />
                -
                <input
                    type={"text"}
                    value={shortValue}
                    onChange={(e) => setShortValue(e.target.value)}
                    id={"activity-list-item-short-input"}
                    onBlur={handleFocusOut}
                    maxLength={2}
                    style={{opacity: activity.archived ? 0.5 : 1}}
                />
            </div>
            <div className={"activity-list-item__icon-container"}>
            { activity.archived ?
                <Restore
                    className={"activity-list-item__undo-icon"}
                    style={{fill: hovering ? "rgba(196, 136, 82, 0.79)" : "transparent"}}
                    onClick={async () => {
                        await handleRestoreActivity()
                    }}
                />
                :
                <Remove
                    className={"activity-list-item__archive-icon"}
                    style={{fill: hovering ? "rgba(196, 136, 82, 0.79)" : "transparent"}}
                    onClick={async () => {
                        await handleArchiveActivity()
                    }}
                />
            }
            </div>
        </div>
    )
}

export default ActivityListItem