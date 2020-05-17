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
    noteHeightOffset,
    noteTopOffset,
    highestIndexDragNote,
    lowestIndexDragNote
}, ref) => {


    const [render, setRender] = useState(false)
    const [localTop, setLocalTop] = useState(false)
    const [localBottom, setLocalBottom] = useState(false)

    const [topOffset, setTopOffset] = useState(false)
    const [localHeight, setLocalHeight] = useState(false)

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
        setLocalHeight((highestIndexDragNote.bottom - lowestIndexDragNote.top)-1)
        setLocalTop(rect.top)
        setTopOffset(lowestIndexDragNote.top - localTop)
    }, [ref, highestIndexDragNote, lowestIndexDragNote])
   
    

    const getHeight = () => {
        // var highestIndex = Math.max(...Object.keys(noteIndices[day][noteid]))
        // var lowestIndex = Math.min(...Object.keys(noteIndices[day][noteid])) 
        // // console.log(highestIndex)
        // if (highestIndex > draggedNoteIndex) {
        //     return (noteHeightOffset && localTop) &&(noteHeightOffset - noteTopOffset)-1
        // } else if (lowestIndex < draggedNoteIndex){
        //     return (noteHeightOffset && localBottom) && (localBottom - noteHeightOffset)-1
        // }
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
        } else  {
            return -38.5
        }
    }
    console.log(getTopOffset())
    return (
    <div style={{"position":'relative'}} >
        
        <div    ref={combinedRef}
                id="note-drag-container"
                className="note-container"
                style={{
                    // "height": `${render && (Object.keys(noteIndices[day][noteid]).length * 24)+ whichAddition(Object.keys(noteIndices[day][noteid]).length)}px`,
                    // "height": `${getHeight()}px`,
                    "height":`${localHeight}px`,
                    "position": `${render && 'absolute'}`,
                    // "top": `${-11.5}px`,
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