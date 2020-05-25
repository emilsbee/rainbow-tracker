// External imports
import React, { useEffect, useState } from 'react'
import { useStoreState } from 'easy-peasy'

// Internal imports 
import './category-item-popover.scss'



const CategoryItemPopover  = ({ onClick, handleCloseModal, mousePosition }) => {
    const colors = useStoreState(state => state.settings.categorySettings)  
    const [cursorType, setCursorType] = useState(null)
    
    useEffect(() => {
        setCursorType('pointer')
    }, [])

    return (
        <div 
            className="popover-container" 
            onMouseLeave={handleCloseModal} 
            style={{
                "top": mousePosition - 30, 
                "cursor": cursorType}}
        >
            {Object.keys(colors).map((category) => {
                console.log(category)
                return <div 
                            className="color-square"  
                            onClick={() => onClick(category)} 
                            key={category} 
                            style={{"backgroundColor": colors[category].color}}
                        />
                    
            })}
            <div
                className="color-square"  
                onClick={() => onClick("")} 
                style={{"backgroundColor": "#ebebe0"}}
            >

            </div>
        </div>
    )
}

export default CategoryItemPopover