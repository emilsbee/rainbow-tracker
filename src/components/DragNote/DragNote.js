// External imports
import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports 
import './drag-note.scss'

const DragNote  = React.forwardRef(({ 
    day,
    note, 
    noteid, 
    noteIndices, 
    draggedNoteIndex, 
    draggedNoteDay, 
    highestIndexDragNote,
    lowestIndexDragNote
}, ref) => {
    console.log(highestIndexDragNote)

    const [render, setRender] = useState(false)
    const [localTop, setLocalTop] = useState(false)
    const [localBottom, setLocalBottom] = useState(false)

    const [topOffset, setTopOffset] = useState(false)
    const [localHeight, setLocalHeight] = useState(false)

    const [currentHeight, setCurrentHeight] = useState(false)
    const [prevHeight, setPrevHeight] = useState(false)
    const [scrollFlag, setScrollFlag] = useState(false)

    function useCombinedRefs(...refs) {
        const targetRef = React.useRef()
      
        React.useEffect(() => {
          refs.forEach(ref => {
            if (!ref) return
      
            if (typeof ref === 'function') {
              ref(targetRef.current)
            } else {
              ref.current = targetRef.current
            }
          })
        }, [refs])
      
        return targetRef
      }

    useEffect(() => {        
        if (Object.keys(noteIndices[day][noteid]).length > 1) {
            setRender(true)
        }
    })
 
    const innerRef = React.useRef(null)
    const combinedRef = useCombinedRefs(ref, innerRef)

    React.useLayoutEffect(() => {
        const rect = combinedRef.current.getBoundingClientRect()
        setLocalTop(rect.top)
        setLocalBottom(rect.bottom)
        // setLocalHeight((highestIndexDragNote.bottom - lowestIndexDragNote.top)-1)
        // console.log('current: ',localHeight)
        
        
        if (scrollFlag) {
            setCurrentHeight(currentHeight+27)
        } else if (!currentHeight && !prevHeight) {
            setCurrentHeight((highestIndexDragNote.bottom - lowestIndexDragNote.top)-1)
        } else if (currentHeight && !prevHeight) {
            setCurrentHeight((highestIndexDragNote.bottom - lowestIndexDragNote.top)-1)
            if (currentHeight- prevHeight !== 27) {
                setScrollFlag(true)
            }
            setPrevHeight(currentHeight)
        } else if (currentHeight && prevHeight) {
            if (currentHeight-prevHeight !== 27) {
                setScrollFlag(true)
            } else {
                setCurrentHeight((highestIndexDragNote.bottom - lowestIndexDragNote.top)-1)
                if (currentHeight- prevHeight !== 27) {
                    setScrollFlag(true)
                }
                setPrevHeight(currentHeight)
            }
        }



        setLocalTop(rect.top)
        setTopOffset(lowestIndexDragNote.top - localTop)
    }, [ref, highestIndexDragNote, lowestIndexDragNote])
   
    

    const getHeight = () => {
        return (highestIndexDragNote.bottom - lowestIndexDragNote.top)
    }
   
    const getTopOffset = () => {
        var lowestIndex = Math.min(...Object.keys(noteIndices[day][noteid])) 
        var highestIndex = Math.max(...Object.keys(noteIndices[day][noteid]))

        if (lowestIndex === draggedNoteIndex) {
            return -11.5
        } else if (highestIndex === draggedNoteIndex) {
            var leng = Object.keys(noteIndices[day][noteid]).length

            if (leng === 2 ) {
                return -38.5
            } else if (leng > 2) {
                return -38.5 + ((leng - 2) * -27)
            }
        } else if (lowestIndex === (draggedNoteIndex-1) && highestIndex === (draggedNoteIndex+1)) {
            return -38.5
        } else  {
            const lessThanDragIndex = Object.keys(noteIndices[day][noteid]).filter(index => index < draggedNoteIndex)
            return  -38.5 + ((lessThanDragIndex.length - 1) * -27)
        }
    }
    return (
    <div style={{"position":'relative'}} >
        
        <div    ref={combinedRef}
                id="note-drag-container"
                className="note-container"
                style={{
                    "height":`${currentHeight}px`,
                    "position": `${render && 'absolute'}`,
                    "top": `${getTopOffset()}px`,
                    "left": "0px"
                }}
                // ref={el => {
                //     if (!el) return 
                //     console.log("Drag: ",el.getBoundingClientRect())
                // }}
            >
            
        </div>
        </div>
    )
})

export default DragNote