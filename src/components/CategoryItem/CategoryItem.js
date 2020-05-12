// External imports
import React, { useState } from "react";
import { useStoreState, useStoreActions } from 'easy-peasy'

// Internal imports
import CategoryItemPopover from '../CategoryItemPopover/CategoryItemPopover'

export default ({ 
  category, 
  day,
  index, 
  weekid, 
  setDragCategory,
  dragCategory,
  localWeek,
  draggedCategories,
  setDraggedCategories,
  setDragIndex
}) => {
  const categorySettings = useStoreState(state => state.settings.categorySettings)
  const updateWeek = useStoreActions(actions => actions.weeks.updateWeek)

  const [showPopover, setShowPopover] = useState(false)
  const [mousePos, setMousePos] = useState('')
  const [localCategory, setLocalCategory] = useState(category)


  const handleDragStart = (e) => {
      let img = new Image()
      e.dataTransfer.setDragImage(img, 1, 1)
      setDragCategory(localCategory)
  }


  const handleDragEnter = (e) => {
    setDragIndex(index)

    if (draggedCategories.length === 0) {
      setLocalCategory(dragCategory)
      var categoryObj = {}
      categoryObj[day] = [index]
      setDraggedCategories(categoryObj)
    } else {
      setLocalCategory(dragCategory)
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
      draggedCategories
    })
    setDragCategory('')
    setDraggedCategories([])
  }

  const handleShowPopover = (e) => {
    setMousePos(e.pageY)
    setShowPopover(true)
  }

  const handleClick = ({category}) => {
    setShowPopover(false)
    setLocalCategory(category)
    updateWeek({
      type: 'CATEGORY_ONCE',
      weekid,
      day,
      index,
      category

    })
  }
  
  const handleCloseModal = () => {
    setShowPopover(false)
  }
  
  return (
    <div>
    <div 
        className="test-item" 
        draggable={true}
        onDragStart={handleDragStart}
        onDragEnter={handleDragEnter}
        style={{"backgroundColor": localCategory !== '' ? categorySettings[localCategory] : "#ebebe0" }}
        onClick={handleShowPopover}
        onDragEnd={handleDragEnd}
    />

    {showPopover ? <CategoryItemPopover mousePosition={mousePos} onClick={handleClick} handleCloseModal={handleCloseModal}/> : null}
    
    </div>
  );
};
