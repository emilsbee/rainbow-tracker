// External imports
import React, { useEffect, useState } from 'react'
import { useStoreState } from 'easy-peasy'

// Internal imports 
import './activity-item-popover.scss'


const ActivityItemPopover  = ({ onClick, handleCloseModal, mousePositionY, category, mousePositionX }) => {
    const activitySettings = useStoreState(state => state.settings.activitySettings)
    const [cursorType, setCursorType] = useState(null)
    
    useEffect(() => {
        setCursorType('pointer')
    }, [])  
    

    return (
        <div 
            className="popover_container" 
            onMouseLeave={handleCloseModal} 
            style={{
                "top": mousePositionY - 30,
                "left": mousePositionX - 13, 
                "cursor": cursorType, 
                "display": category === 'sleep' ? 'none' : ''}}
        >
            {Object.keys(activitySettings[category]).map((activity) => {
                return <div 
                            className="popover"
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