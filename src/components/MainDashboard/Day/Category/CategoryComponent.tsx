// External imports
import React, { useState, DragEvent } from 'react'

// Internal imports
import {useStoreActions, useStoreState} from "../../../../store/hookSetup"
import CategoryPopover from './CategoryItemPopover/CategoryItemPopover'
import ActivityPopover from '../Activity/ActivityItemPopover/ActivityItemPopover'
import Activity from '../Activity/Activity'
import './Category.scss'
import { hasActivities } from './helpers'
import {Category} from "../../../../store/categories/categories";

type CategoryProps = {
    category:Category;
    onDragStart: (e:DragEvent<HTMLDivElement>, category:Category) => void;
    onDragEnter: (category:Category) => void;
}

function CategoryComponent({category, onDragStart, onDragEnter}: CategoryProps) {
    // Store actions
    const setHoverIndex = useStoreActions(actions => actions.settings.setHoverIndex)
    const setCategory = useStoreActions(actions => actions.categories.setCategory)
    const setActivity = useStoreActions(actions => actions.categories.setActivity)

    // Store state
    const activityTypes = useStoreState(state => state.settings.activityTypes)
    const categoryTypes = useStoreState(state => state.settings.categoryTypes)

    // Local state
    const [showActivityPopover, setShowActivityPopover] = useState(false)
    const [showPopover, setShowPopover] = useState(false)


    /**
     * Handles category picking from the category popover.
     * Closes the popover and sets the new category.
     * @param categoryid The categoryid of category that was picked.
     */
    const onCategoryPick = (categoryid:string | null):void => {
        setShowPopover(false)
        setCategory({
            userid: category.userid,
            weekid: category.weekid,
            categoryid,
            weekDay: category.weekDay,
            categoryPosition: category.categoryPosition,
            activityid: null
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
            weekDay: category.weekDay,
            categoryPosition: category.categoryPosition
        })
    }

    /**
     * Finds category's (from props) color using the category types array.
     * If the category has no categoryid (it's empty) a default color is returned.
     */
    const getBackgroundColor = ():string => {
        if (category.categoryid) {
            for (let i = 0; i < categoryTypes.length; i++) {
                if (categoryTypes[i].categoryid === category.categoryid) {
                    return categoryTypes[i].color
                }
            }
        }

        return "#2A353C"
    }

    const getActivityTypeShort = ():string => {
        if (category.activityid) {
            for (let i = 0; i < activityTypes.length; i++) {
                if (activityTypes[i].activityid === category.activityid) {
                    return activityTypes[i].short
                }
            }
        }
        return ""
    }

    return (
        <div id="category-activity-container" onMouseOver={() => setHoverIndex({timeHoverIndex: category.categoryPosition-1})}>
            <div   
                id={`category-container`}
                onDragEnter={() => onDragEnter(category)}
                onDragStart={(e) => onDragStart(e, category)}
                draggable={true}
                onClick={() => setShowPopover(true)}
                style={{
                    backgroundColor: getBackgroundColor()
                }}
            />
            
            <Activity 
                short={getActivityTypeShort()}
                categoryid={category.categoryid}
                block={!hasActivities(category.categoryid, activityTypes)}
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

export default CategoryComponent;
