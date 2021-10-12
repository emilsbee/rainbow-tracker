// External imports
import React from "react";
import {Link} from "react-router-dom"

// Internal imports
import "./activity-list.scss"
import {ActivityType} from "../../../store/settings/settings";
import ActivityListItem from "./ActivityListItem/ActivityListItem";
import {validateActivitySubmission} from "../../../store/categories/helpers";
import {useStoreActions, useStoreState} from "../../../store/hookSetup";
import {ReactComponent as Add} from "../../../svgIcons/add.svg";
import {createActivityType, updateActivityType} from "../../../dao/settingsDao";

type ActivityListProps = {
    activityTypes:ActivityType[],
    categoryid:string,
    setError: ({message}:{message:string}) => void,
    viewArchived: boolean
}

const ActivityList:React.FC<ActivityListProps> = ({activityTypes, categoryid, setError, viewArchived}) => {
    // Store actions
    const updateActivityTypes = useStoreActions(actions => actions.settings.updateActivityType)
    const createActivityTypeLocally = useStoreActions(actions => actions.settings.createActivityType)

    // Store state
    const userid = useStoreState(state => state.auth.uid)

    // Local state
    const [newActivity, setNewActivity] = React.useState<boolean>(false)
    const [newActivityLong, setNewActivityLong] = React.useState<string>("")
    const [newActivityShort, setNewActivityShort] = React.useState<string>("")

    /**
     * Handles event when one of the activity inputs comes out of focus.
     * This function then updates the activity in activity types.
     */
    const handleActivityChange = async (activityType:ActivityType):Promise<void> => {
        const {valid, message} = validateActivitySubmission(activityType.long, activityType.short)

        if (valid) {
            const updatedActivity = await updateActivityType(userid, activityType)
            updateActivityTypes({activityType: updatedActivity})
            setError({message: ""})
        } else {
            setError({message})
        }
    }

    const handleNewActivityKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (newActivityShort.length > 0 && newActivityLong.length > 0) {
                const newActivityType = await createActivityType(userid, newActivityLong, newActivityShort, categoryid)
                if (newActivityType) {
                    console.log("runs")
                    createActivityTypeLocally({activityType: newActivityType})
                }
            }
            setNewActivity(false)
            setNewActivityShort("")
            setNewActivityLong("")
        }
    }

    const handleKeyPress = async (e:KeyboardEvent) => {
        if (e.key === "Escape") {
            setNewActivity(false)
            setNewActivityLong("")
            setNewActivityShort("")
        }
    }

    React.useEffect(() => {
        document.addEventListener("keydown", handleKeyPress, false);


        return () => {
            document.removeEventListener("keydown", handleKeyPress, false);
        }
    }, [])

    return (
        <div className={"activity-list-container"}>
            <div>
            {activityTypes.map(activityType => {
                if (activityType.categoryid === categoryid) {
                    if (viewArchived || (!viewArchived && !activityType.archived)) {
                        return (
                            <ActivityListItem
                                viewArchived={viewArchived}
                                key={activityType.activityid}
                                activity={activityType}
                                onChange={handleActivityChange}
                            />
                        )
                    } else return null
                } else return null
            })}
            </div>

            <div className={"activity-list-add-icon-container"}>
                {newActivity &&
                <div className={"activity-list-input-container"}>
                    <input
                        type="text"
                        value={newActivityLong}
                        onChange={(e) => setNewActivityLong(e.target.value)}
                        className={"activity-list-long-input"}
                        maxLength={40}
                        onKeyDown={async (e) => await handleNewActivityKeyDown(e)}
                    />
                    -
                    <input
                        type="text"
                        value={newActivityShort}
                        onChange={(e) => setNewActivityShort(e.target.value)}
                        className={"activity-list-short-input"}
                        maxLength={2}
                        onKeyDown={async e => await handleNewActivityKeyDown(e)}
                    />
                </div>
                }

                {!newActivity &&
                    <Add height={16} width={16} fill={"white"} className={"activity-list-add-icon"} onClick={() => setNewActivity(true)}/>
                }
            </div>
        </div>
    )
}

export default ActivityList