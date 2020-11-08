// External imports
import React from 'react'
import { useStoreState } from 'easy-peasy'

// Internal imports 
import './Styles.scss'



const CategoryItemPopover  = ({ onClick, handleCloseModal }) => {
    const categories = useStoreState(state => state.settings.categorySettings)  
    
    return (
        <div>
            <div 
                className="popover-container" 
                onMouseLeave={handleCloseModal} 
                style={{
                    cursor: 'pointer' // To immediately set the cursor to pointer
                }}
            >
                {Object.keys(categories).map((categoryid, index) => { // iterates over categoryids
                    return (
                        <div 
                            className="color-square"  
                            key={categoryid} 
                            onClick={() => onClick(categoryid)} 
                            style={{
                                "backgroundColor": categories[categoryid].color,
                                "borderTopLeftRadius": index === 0  && '3px',
                                "borderTopRightRadius": index === 0  && '3px'
                            }}
                        />
                    )
                })}

                {/* The default square at the bottom*/}
                <div
                    className="default-color-square"  
                    onClick={() => onClick("")} 
                />

            </div>
        </div>
    )
}

export default CategoryItemPopover