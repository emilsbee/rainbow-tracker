// External imports
import React, { useState, useEffect } from 'react'

// Internal imports 
import './note.scss'
import { useStoreActions } from 'easy-peasy'


const Note  = React.forwardRef(({
        note, 
        onClick, 
        day, 
        noteid, 
        index, 
        setDraggedNoteIndex, 
        draggedNoteIndex,
        setNoteIndices,
        allNoteIndices,
        setDraggedNoteid,
        draggedNoteid,
        setDraggedNoteDay,
        draggedNoteDay,
        notes,
        setNotes,
        setDragIndex,
        setLocalRef,
        setNoteHeightOffset,
        setNoteTopOffset,
        noteTopOffset,
        weekid,
        highestIndexDragNote,
        setHighestIndexDragNote,
        lowestIndexDragNote,
        setLowestIndexDragNote
}, ref) => {
    const updateNotes = useStoreActions(actions => actions.weeks.updateNotes)

    const [localNote, setLocalNote] = useState(false)
    const [localNoteIndices, setLocalNoteIndices] = useState([])

    const [localRect, setLocalRect] = useState('')

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

    const innerRef = React.useRef(null)
    const combinedRef = useCombinedRefs(ref, innerRef)

    React.useLayoutEffect(() => {
        const rect = combinedRef.current.getBoundingClientRect()
        setLocalRect(rect)
    }, [ref])

    

    useEffect(() => {
        setLocalNote(notes[day][noteid])
    }, [notes])
    

    const handleDragStart = (e) => {
        setLowestIndexDragNote(localRect)
        setHighestIndexDragNote(localRect)
        setNoteTopOffset(localRect.top)
        setLocalNote(false)
        let img = new Image()
        e.dataTransfer.setDragImage(img, 1, 1)
        setDraggedNoteIndex(index)
        setDraggedNoteid(noteid)
        setDraggedNoteDay(day)
    }   
    
    const handleDragEnter = (e) => {
        if (day !== draggedNoteDay) {
            return 
        }
        if (index !== draggedNoteIndex) {
            var maxIndex = Math.max(...Object.keys(allNoteIndices[draggedNoteDay][draggedNoteid]))
            var minIndex = Math.min(...Object.keys(allNoteIndices[draggedNoteDay][draggedNoteid]))

            if (index > maxIndex) {
                setHighestIndexDragNote(localRect)
            } else if (index < minIndex) {
                setLowestIndexDragNote(localRect)
            }

            if (index > draggedNoteIndex) {
                setNoteHeightOffset(localRect.bottom)
            } else if ( index < draggedNoteIndex) {
                setNoteHeightOffset(localRect.top)
            }
            
            if (localRect.top < noteTopOffset) {
                setNoteTopOffset(localRect.top)    
            }

            setLocalNote(false)
            setDragIndex(index)
            notes[day][noteid] = false
            var newIndicesObj = {}
            var dragKeys = Object.keys(allNoteIndices[draggedNoteDay][draggedNoteid])
            for (var key in dragKeys) {
                newIndicesObj[dragKeys[key]] = true 
            }
            newIndicesObj[index] = true
            allNoteIndices[draggedNoteDay][draggedNoteid] = newIndicesObj
            setNoteIndices(allNoteIndices)
        }
    
        
    }
    
    const handleDragEnd = () => {  
        updateNotes({
            draggedIndices: allNoteIndices[draggedNoteDay][draggedNoteid],
            draggedNoteIndex,
            day: draggedNoteDay,
            weekid,
            draggedNoteid
        })
        setDraggedNoteDay('')
        setDraggedNoteIndex('')
        setDraggedNoteid('')
        setHighestIndexDragNote('')
        setLowestIndexDragNote('')
    }

    return (
        
        <div 
            id={`${day}_${index}`}
            style={{
                "display": (localNote === false) && 'none'
            }}
            className="note-container"
            draggable={true}
            onClick={() => onClick({day, noteid, note, index})}
            onDragStart={handleDragStart}
            onDragEnter={handleDragEnter}
            onDragEnd={handleDragEnd}
            // ref={el => {
            //     if (!el) return 
            //     if (day !== "Monday") return 
            //     if (index !== (3) ) return 
            //     console.log("Drag: ",el.getBoundingClientRect())
            // }}
            ref={combinedRef}
        >
            {note}
        </div>
    )
})


export default Note


