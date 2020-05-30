// External imports
import React, { useEffect, useState } from 'react'
import { useStoreState } from 'easy-peasy'

// Internal imports 
import './category-item-popover.scss'



const CategoryItemPopover  = ({ onClick, handleCloseModal, mousePositionX, mousePositionY, offset }) => {
    const colors = useStoreState(state => state.settings.categorySettings)  
    const [cursorType, setCursorType] = useState(null)
    
    useEffect(() => {
        setCursorType('pointer')
    }, [])
    return (
        <div>
            <div 
                className="popover-container" 
                onMouseLeave={handleCloseModal} 
                style={{
                    "cursor": cursorType,
                    "left": offset && '-43.5px'
                }}
            >
                {Object.keys(colors).map((category, index) => {
                    
                    return <div 
                                className="color-square"  
                                onClick={() => onClick(category)} 
                                key={category} 
                                style={{
                                    "backgroundColor": colors[category].color,
                                    "borderTopLeftRadius": index === 0  && '3px',
                                    "borderTopRightRadius": index === 0  && '3px'
                                }}
                            />
                        
                })}
                <div
                    className="color-square"  
                    onClick={() => onClick("")} 
                    style={{
                        "border": "none",
                        "backgroundColor": "#ebebe0",
                        "borderBottomLeftRadius": '3px',
                        "borderBottomRightRadius": '3px'
                    }}
                >

                </div>
            </div>
        </div>
    )
}

export default CategoryItemPopover