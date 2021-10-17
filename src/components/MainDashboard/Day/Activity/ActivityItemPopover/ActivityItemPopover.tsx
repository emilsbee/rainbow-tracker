// External imports
import React from 'react'

// Internal imports 
import './ActivityItemPopover.scss'
import {useStoreState} from "../../../../../store/hookSetup";

type ActivityItemPopoverProps = {
    onClick: (activityid: string | null) => void,
    handleCloseModal: () => void,
    categoryid: string | null
}

const ActivityItemPopover = ({onClick, handleCloseModal, categoryid}: ActivityItemPopoverProps) => {
    const activityTypes = useStoreState(state => state.settings.activityTypes)

    return (
        <div>
            <div
                id="activity-popover-container"
                onMouseLeave={handleCloseModal}
                style={{
                    cursor: 'pointer' // To immediately set the cursor to pointer, 
                }}
            >
                {activityTypes.map((activityType, index) => {
                    if (activityType.categoryid === categoryid && !activityType.archived) { // checks that the activity belongs to current category
                        return (
                            <div
                                id="activity-popover-item"
                                onClick={() => onClick(activityType.activityid)}
                                key={activityType.activityid}
                                style={{
                                    "borderTopLeftRadius": index === 0 ? '5px' : "0",
                                    "borderTopRightRadius": index === 0 ? '5px' : "0"
                                }}
                            >
                                {activityType.short}
                            </div>
                        )
                    } else return null
                })}

                <div
                    id="activity-popover-item-default"
                    onClick={() => onClick(null)}
                />
            </div>
        </div>
    )
}

export default ActivityItemPopover