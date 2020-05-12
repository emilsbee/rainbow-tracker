// External imports
import React, { useEffect, useState, useRef } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports 

const CategoryItemPopover  = ({ onClick, handleCloseModal, mousePosition }) => {
    const colors = useStoreState(state => state.settings.categorySettings)  
    const [cursorType, setCursorType] = useState(null)
    
    useEffect(() => {
        setCursorType('pointer')
    }, [])

    return (
        <div className="color-square__container" onMouseLeave={handleCloseModal} style={{"top": mousePosition - 30, "cursor": cursorType}}>
            {Object.keys(colors).map((category) => {
                return <div 
                        className="color-square"  
                        onClick={() => onClick(category)} 
                        key={category} 
                        style={
                            {
                                "backgroundColor": colors[category]
                            }
                        }
                        />
                    
            })}
    
        </div>
    )
}

export default CategoryItemPopover