// External imports
import React from 'react'
import { useStoreState } from 'easy-peasy'

// Internal imports 
import './Styles.scss'


const ActivityItemPopover  = ({ onClick, handleCloseModal, categoryid }) => {
    const activities = useStoreState(state => state.settings.activitySettings)
    
    return (
        <div>
            <div 
                id="activity-popover-container" 
                onMouseLeave={handleCloseModal} 
                style={{
                    cursor: 'pointer' // To immediately set the cursor to pointer, 
                }}
            >
                {Object.keys(activities).map((activityid, index) => { // iterates over activityids

                    if (activities[activityid].categoryid === categoryid) { // checks that the activity belongs to current category
                        return (
                            <div 
                                id="activity-popover-item"
                                onClick={() => onClick(activityid)} 
                                key={activityid} 
                                style={{
                                    "borderTopLeftRadius": index === 0  && '5px',
                                    "borderTopRightRadius": index === 0  && '5px'
                                }}
                            >
                                {activities[activityid].short}
                            </div>
                        )
                    }
                        
                })}

                <div 
                    id="activity-popover-item-default"
                    onClick={() => onClick("")} 
                />
            </div>
        </div>
    )
}

export default ActivityItemPopover