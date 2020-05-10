// External imports
import React, { useState } from "react";
import { useStoreState, useStoreActions } from 'easy-peasy'

// Internal imports
import CategoryItemPopover from '../CategoryItemPopover/CategoryItemPopover'

export default ({ category, day,index, weekid} ) => {
  const categorySettings = useStoreState(state => state.settings.categorySettings)
  const updateWeek = useStoreActions(actions => actions.weeks.updateWeek)

  const [showPopover, setShowPopover] = useState(false)
  const [mousePos, setMousePos] = useState('')

  const handleDragStart = (e) => {
      let img = new Image()
      e.dataTransfer.setDragImage(img, 1, 1)
      
  }

  const handleDragEnter = (e) => {
  
  }


  const handleShowPopover = (e) => {
    setMousePos(e.pageY)
    // console.log('Client: ', e.clientY)
    // console.log('Movement: ', e.movementY)
    // console.log('Page: ', e.pageY)
    // console.log('Screen: ', e.screenY)

    setShowPopover(true)
  }



  const handleClick = ({category}) => {
    setShowPopover(false)
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
        style={{"backgroundColor": category !== '' ? categorySettings[category] : "#ebebe0" }}
        onClick={handleShowPopover}
    />

    {showPopover ? <CategoryItemPopover mousePosition={mousePos} onClick={handleClick} handleCloseModal={handleCloseModal}/> : null}
    
    </div>
  );
};
