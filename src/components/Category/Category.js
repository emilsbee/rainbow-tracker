// External imports
import React, { useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import CategoryPopover from '../CategoryItemPopover/CategoryItemPopover'
import ActivityPopover from '../ActivityItemPopover/ActivityItemPopover'

// Internal imports
import Activity from '../Activity/Activity'
import './Styles.scss'

function Category({category, onDragStart, onDragEnter}) {
    const setHoverIndex = useStoreActions(actions => actions.settings.setHoverIndex)

    const activitySettings = useStoreState(state => state.settings.activitySettings)
    const categorySettings = useStoreState(state => state.settings.categorySettings)

    const setCategory = useStoreActions(actions => actions.activities.setCategory)
    const setActivity = useStoreActions(actions => actions.activities.setActivity)
    
    const [showActivityPopover, setShowActivityPopover] = useState(false)
    const [showPopover, setShowPopover] = useState(false)


    // When one of the colors are clicked from category popover
    const onCategoryPick = (categoryid) => {
        setShowPopover(false)
        setCategory({
            categoryid, 
            day: category.day,
            position: category.position
        })
    } 
    
    // When one of the activities are clicked from activity popover
    const onActivityPick = (activityid) => {
        setShowActivityPopover(false)
        setActivity({
            activityid, 
            day: category.day,
            position: category.position
        })
    }
    
    return (
        <div id="category-activity-container" onMouseOver={() => setHoverIndex({timeHoverIndex: category.position-1})}>
            <div   
                id="category-container"
                onDragEnter={() => onDragEnter(category)}
                onDragStart={(e) => onDragStart(e, category)}
                draggable={true}
                onClick={() => setShowPopover(true)}
                style={{
                    backgroundColor: category.categoryid === "" ?  'rgb(235, 235, 224)' : categorySettings[category.categoryid].color, // if category exists sets the color to that categories color, else default color
                }}
            />
            
            <Activity 
                short={category.activityid ? activitySettings[category.activityid].short : ""} // if activity exists, sets the short, otherwise sets it as an empty string
                categoryid={category.categoryid}
                activityid={category.activityid} 
                loading={false}  
                onClick={() => setShowActivityPopover(true)}
            />
            
            {showPopover &&
                <CategoryPopover 
                    onClick={onCategoryPick} 
                    handleCloseModal={() => setShowPopover(false)}
                />
            }

            {showActivityPopover && 
                <ActivityPopover 
                    categoryid={category.categoryid}  
                    onClick={onActivityPick} 
                    handleCloseModal={() => setShowActivityPopover(false)}
                /> 
            }
        </div>
    );
}

export default Category;
