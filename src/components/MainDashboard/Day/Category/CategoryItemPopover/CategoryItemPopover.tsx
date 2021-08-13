// External imports
import React from 'react'

// Internal imports 
import './CategoryItemPopover.scss'
import {useStoreState} from "../../../../../store/hookSetup";

type CategoryItemPopoverType = {
    onClick: (categoryid:string | null) => void,
    handleCloseModal: () => void
}


const CategoryItemPopover  = ({ onClick, handleCloseModal }:CategoryItemPopoverType) => {
    const categoryTypes = useStoreState(state => state.settings.categoryTypes)
    
    return (
        <div>
            <div 
                className="popover-container" 
                onMouseLeave={handleCloseModal} 
                style={{
                    cursor: 'pointer' // To immediately set the cursor to pointer
                }}
            >
                {categoryTypes.map((categoryType, index) => {

                    return (
                        <div
                            className="color-square"
                            key={categoryType.categoryid}
                            onClick={() => onClick(categoryType.categoryid)}
                            style={{
                                "backgroundColor": categoryType.color,
                                "borderTopLeftRadius": index === 0  ? '3px' : "0",
                                "borderTopRightRadius": index === 0  ? '3px' : "0"
                            }}
                        />
                    )
                })}

                {/* The default square at the bottom*/}
                <div
                    className="default-color-square"  
                    onClick={() => onClick(null)}
                />

            </div>
        </div>
    )
}

export default CategoryItemPopover