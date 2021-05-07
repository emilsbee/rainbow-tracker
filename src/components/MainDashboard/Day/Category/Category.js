// External imports
import React, { useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import PropTypes from 'prop-types'


// Internal imports
import CategoryPopover from './CategoryItemPopover/CategoryItemPopover'
import ActivityPopover from '../Activity/ActivityItemPopover/ActivityItemPopover'
import Activity from '../Activity/Activity'
import './Category.scss'
import { hasActivities } from './helpers'

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
    
    const onActivityClick = () => {
        if (hasActivities(category.categoryid, activitySettings)) {
            setShowActivityPopover(true)
        }
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
                // Block checks if a category has activities.
                // If it doesn't the activity shouldn't highlight on hover
                // and user should'nt be able to click on activity to get activity popover
                block={hasActivities(category.categoryid, activitySettings)}
                onClick={onActivityClick}
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

Category.propTypes = {
    onDragEnter: PropTypes.func,
    onDragStart: PropTypes.func,
    category: PropTypes.exact({
        activityid: PropTypes.string.isRequired,
        categoryid: PropTypes.string.isRequired,
        day: PropTypes.string.isRequired,
        position: PropTypes.number.isRequired
    })
}

export default Category;
