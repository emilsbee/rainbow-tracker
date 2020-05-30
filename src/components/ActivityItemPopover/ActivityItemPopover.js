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
        <div style={{"position":"relative", "left":"-20px", "zIndex":"200"}}>
        <div 
            className="popover_container" 
            onMouseLeave={handleCloseModal} 
            style={{
                "top": mousePositionY - 30,
                "left": mousePositionX - 13, 
                "cursor": cursorType, 
            }}
        >
            {activitySettings[category] && Object.keys(activitySettings[category]).map((activityid, index) => {
                
                return <div 
                            className="popover"
                            onClick={() => onClick(activityid)} 
                            key={activityid} 
                            style={{
                                "borderTopLeftRadius": index === 0  && '5px',
                                "borderTopRightRadius": index === 0  && '5px'
                            }}
                        >
                            {activitySettings[category][activityid].short}
                        </div>
                    
            })}
            <div 
                className="popover"
                onClick={() => onClick("")} 
                style={{
                    "border": "none",
                    "borderBottomLeftRadius": '5px',
                    "borderBottomRightRadius": '5px'
                }}
            >
            
            </div>
        </div>
        </div>
    )
}

export default ActivityItemPopover