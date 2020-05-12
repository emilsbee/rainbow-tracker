// External imports
import React, { useEffect, useState, useRef } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports 

const ActivityItemPopover  = ({ onClick, handleCloseModal, mousePositionY, category, mousePositionX }) => {
    const activitySettings = useStoreState(state => state.settings.activitySettings)
    const [cursorType, setCursorType] = useState(null)
    
    useEffect(() => {
        setCursorType('pointer')
    }, [])  
    

    return (
        <div className="activity-item-popover__container" onMouseLeave={handleCloseModal} style={{"top": mousePositionY - 30,"left": mousePositionX - 13, "cursor": cursorType, "display": category === 'sleep' ? 'none' : ''}}>
            {Object.keys(activitySettings[category]).map((activity) => {
                return <div  
                            className="activity-item-popover"
                            onClick={() => onClick(activity)} 
                            key={activity} 
                        >
                            {activity}
                        </div>
                    
            })}
    
        </div>
    )
}

export default ActivityItemPopover