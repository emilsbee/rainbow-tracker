// External imports
import React, { useState, DragEvent } from 'react'

// Internal imports
import {useStoreActions, useStoreState} from "../../../../store/hookSetup"
import CategoryPopover from './CategoryItemPopover/CategoryItemPopover'
import ActivityPopover from '../Activity/ActivityItemPopover/ActivityItemPopover'
import Activity from '../Activity/Activity'
import './Category.scss'
import { hasActivities } from './helpers'
import {CategoryType} from "../../../../store/categories/categories";

type CategoryProps = {
    category:CategoryType;
    onDragStart: (e:DragEvent<HTMLDivElement>, category:CategoryType) => void;
    onDragEnter: (category:CategoryType) => void;
}

function Category({category, onDragStart, onDragEnter}: CategoryProps) {
    // Store actions
    const setHoverIndex = useStoreActions(actions => actions.settings.setHoverIndex)
    const setCategory = useStoreActions(actions => actions.activities.setCategory)
    const setActivity = useStoreActions(actions => actions.activities.setActivity)

    // Store state
    const activitySettings = useStoreState(state => state.settings.activitySettings)
    const categorySettings = useStoreState(state => state.settings.categorySettings)

    // Local state
    const [showActivityPopover, setShowActivityPopover] = useState(false)
    const [showPopover, setShowPopover] = useState(false)

    /**
     * Handles category picking from the category popover.
     * Closes the popover and sets the new category.
     * @param categoryid The categoryid of category that was picked.
     */
    const onCategoryPick = (categoryid:string):void => {
        setShowPopover(false)
        setCategory({
            categoryid, 
            day: category.day,
            position: category.position,
            activityid: ""
        })
    }

    /**
     * Handles activity picking from the activity popover.
     * Closes the popover and sets the new activity.
     * @param activityid The activityid of activity that was picked.
     */
    const onActivityPick = (activityid:string):void => {
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
                    backgroundColor: category.categoryid === "" ?  '#2A353C' : categorySettings[category.categoryid].color, // If category exists sets the color to that categories color, else empty cell color
                }}
            />
            
            <Activity 
                short={category.activityid ? activitySettings[category.activityid].short : ""} // If activity exists, sets the short, otherwise sets it as an empty string
                categoryid={category.categoryid}
                block={!hasActivities(category.categoryid, activitySettings)}
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
