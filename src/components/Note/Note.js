// External imports
import React, { useState, useEffect } from 'react'
import { useStoreActions } from 'easy-peasy'

// Internal imports 
import './note.scss'
import { handleDragEnter, handleDragEnd, handleDragStart } from './utils'

const Note  = React.forwardRef(({
        note, 
        day, 
        noteid, 
        index, 
        draggedNoteIndex,
        setDraggedNoteIndex, 
        draggedNoteid,
        setDraggedNoteid,
        draggedNoteDay,
        setDraggedNoteDay,
        allNoteIndices,
        setNoteIndices,
        notes,
        weekid,
        setHighestIndexDragNote,
        setLowestIndexDragNote,
        setDragIndex,
        onClick 
}, ref) => {
    const updateNotes = useStoreActions(actions => actions.weeks.updateNotes)

    const [localNote, setLocalNote] = useState(false)

    // For setting up reference to the note DOM elements
    const [localRect, setLocalRect] = useState('')
    const innerRef = React.useRef(null)
    const combinedRef = useCombinedRefs(ref, innerRef)

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

    React.useLayoutEffect(() => {
        const rect = combinedRef.current.getBoundingClientRect()
        setLocalRect(rect)
    }, [ref])
    

    useEffect(() => {
        setLocalNote(notes[day][noteid])
    }, [notes]) 

    return (
        
        <div 
            id={`${day}_${index}`}
            style={{
                "display": (localNote === false) && 'none'
            }}
            className="note-container"
            draggable={true}
            onClick={() => onClick({day, noteid, note, index})}
            onDragStart={(e) => handleDragStart({
                setLowestIndexDragNote,
                setHighestIndexDragNote,
                localRect,
                setLocalNote,
                e,
                setDraggedNoteIndex,
                index,
                setDraggedNoteid,
                noteid,
                setDraggedNoteDay,
                day
            })}
            onDragEnter={() => {
                handleDragEnter({
                    day,
                    draggedNoteDay,
                    draggedNoteIndex,
                    draggedNoteid,
                    index,
                    allNoteIndices,
                    setHighestIndexDragNote,
                    setLowestIndexDragNote,
                    setLocalNote,
                    setDragIndex,
                    setNoteIndices,
                    localRect
                })
            }}
            onDragEnd={() => {
                handleDragEnd({
                    draggedNoteDay,
                    setDraggedNoteDay,
                    draggedNoteIndex,
                    setDraggedNoteIndex,
                    draggedNoteid,
                    setDraggedNoteid,
                    updateNotes,
                    weekid,
                    allNoteIndices,
                    setHighestIndexDragNote,
                    setLowestIndexDragNote
                })
            }}
            ref={combinedRef}
        >
            {note}
        </div>
    )
})


export default Note


