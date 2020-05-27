// External imports
import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from 'easy-peasy'

// Internal imports
import CategoryItemPopover from '../CategoryItemPopover/CategoryItemPopover'
import ActivityItemPopover from "../ActivityItemPopover/ActivityItemPopover";
import './category-item.scss'

function CategoryItem  ({ 
  category, 
  activity,
  day,
  index, 
  weekid, 
  setDragCategory,
  dragCategory,
  setDragActivity,
  dragActivity,
  draggedCategories,
  setDraggedCategories,
  setDragIndex
}) {
 
  const categorySettings = useStoreState(state => state.settings.categorySettings)
  const activitySettings = useStoreState(state => state.settings.activitySettings)
  const updateWeek = useStoreActions(actions => actions.weeks.updateWeek)
  
  const [showPopover, setShowPopover] = useState(false)
  const [showActivityPopover, setShowActivityPopover] = useState(false)
  const [mousePosY, setMousePosY] = useState('')
  const [mousePosX, setMousePosX] = useState('')
  const [localCategory, setLocalCategory] = useState(category)
  const [localActivity, setLocalActivity] = useState(activity)


  useEffect(() => {
    setLocalCategory(category)
    setLocalActivity(activity)
  }, [category,activity])

  const handleDragStart = (e) => {
      let img = new Image()
      e.dataTransfer.setDragImage(img, 1, 1)
      setDragCategory(localCategory)
      setDragActivity(localActivity)
  }


  const handleDragEnter = (e) => {
    setDragIndex(index)

    if (draggedCategories.length === 0) {
      setLocalCategory(dragCategory)
      setLocalActivity(dragActivity)
      var categoryObj = {}
      categoryObj[day] = [index]
      setDraggedCategories(categoryObj)
    } else {
      setLocalCategory(dragCategory)
      setLocalActivity(dragActivity)
        var copyDraggedCategories = draggedCategories
        if (copyDraggedCategories[day]) {
          if (copyDraggedCategories[day].includes(index)) {
            return 
          } else {
            copyDraggedCategories[day].push(index)
            setDraggedCategories(copyDraggedCategories)
          }
        } else {
          copyDraggedCategories[day] = [index]
          setDraggedCategories(copyDraggedCategories)
        }
    }
  }

  const handleDragEnd = () => {
    updateWeek({
      type: 'CATEGORY_MANY',
      weekid,
      category: dragCategory,
      activity: dragActivity,
      draggedCategories
    })
    setDragCategory('')
    setDragActivity('')
    setDraggedCategories([])
  }

  const handleShowPopover = (e) => {
    setMousePosY(e.pageY)
    setMousePosX(e.pageX)
    setShowPopover(true)
  }

  const handleActivityPopover = (e) => {
    setMousePosY(e.pageY)
    setMousePosX(e.pageX)
    setShowActivityPopover(true)
  }

  const pickCategory = (category) => {
    setShowPopover(false)
    setLocalCategory(category)
    setLocalActivity('')
    updateWeek({
      type: 'CATEGORY_ONCE',
      weekid,
      day,
      index,
      category
    })
  }
  
  const pickActivity = (activity) => {
    setShowActivityPopover(false)
    setLocalActivity(activity)
    updateWeek({
      type: 'ACTIVITY_ONCE',
      weekid,
      day,
      index,
      activity
    })
  }


  return (
    <div className="main-container">

      <div className="category-activity-container">
        {/*  Category component  */}
        
        <div  
            className="category-item" 
            draggable={true}
            onDragStart={handleDragStart}
            onDragEnter={handleDragEnter}
            style={{"backgroundColor": (localCategory !== '' && categorySettings[localCategory]) ? categorySettings[localCategory].color : "#ebebe0"}}
            onClick={handleShowPopover}
            onDragEnd={handleDragEnd}
        />
        {/*  Category component  */}

        {/* Activity componenet */}
        {localCategory !== ''  && 
    
          <div 
            className="activity-item"
            onClick={handleActivityPopover}
          >
            {categorySettings[localCategory] && localActivity && localCategory && activitySettings[localCategory][localActivity] && activitySettings[localCategory][localActivity].short}
          </div>
        }
        {/* Activity componenet */}
      </div>

    {/*  Popover components  */}
      {showPopover ? 
      <div>
        <CategoryItemPopover 
          offset={categorySettings[localCategory] && (categorySettings[localCategory].color ? true : false)}
          mousePositionY={mousePosY} 
          mousePositionX={mousePosX}
          onClick={pickCategory} 
          handleCloseModal={() => setShowPopover(false)}
        /> 
        </div>
        : 
          null
      }

      {showActivityPopover ? 
      <div>
        <ActivityItemPopover 
          category={localCategory} 
          mousePositionY={mousePosY} 
          mousePositionX={mousePosX} 
          onClick={pickActivity} 
          handleCloseModal={() => setShowActivityPopover(false)}
        /> 
        </div>
        : 
        null
      }
    {/*  Popover components  */}

    </div>
  );
};

function areEqual (prevProps, nextProps) {
  
  if (
    prevProps.activity === nextProps.activity &&
    prevProps.category === nextProps.category &&
    prevProps.dragCategory === nextProps.dragCategory &&
    prevProps.dragActivity === nextProps.dragActivity &&
    JSON.stringify(prevProps.draggedCategories) == JSON.stringify(nextProps.draggedCategories) &&
    prevProps.weekid === nextProps.weekid 
  ) {
    return true
  } else {
    return false
  }
  
}

export default React.memo(CategoryItem, areEqual)