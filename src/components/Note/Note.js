// External imports
import React, { useState, useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports 
import './note.scss'
import NoteModal from '../NoteModal/NoteModal'
import { localDaySave, deleteLocalDayNoteStack } from './utils'

const Note  = ({ 
    note, 
    indices, 
    noteid, 
    day, 
    weekid, 
    index,
    notes,
    dragNoteObj,
    noteIndices,
    indexNotes,
    isDraggable,
    

    setLocalNoteIndices,
    setDragNoteObj,
    setLocalNotes
}) => {
    
    // Store actions
    const updateWeek = useStoreActions(actions => actions.weeks.updateWeek)
    const getNotes = useStoreActions(actions => actions.weeks.getNotes)
    const updateNotes = useStoreActions(actions => actions.weeks.updateNotes)
    const deleteNoteStack = useStoreActions(actions => actions.weeks.deleteNoteStack)

    // Local state 
    const[noteModalData, setNoteModalData] = useState(false)
    const[localNote, setLocalNote] = useState(note)
    const[localIndices, setLocalIndices] = useState(false)

    
    
    // Checks for changes in the note and updates the local version of it
    useEffect(() => {
        setLocalNote(note)
    }, [note])

    // Checks for changes in note's indices and updates the local version of it
    useEffect(() => {
        setLocalIndices(indices)
    }, [indices])


    // Function for the note modal to save note
    const handleUpdateNote = ({ day, noteid, note }) => {
        updateWeek({
            type: 'UPDATE_NOTE',
            weekid,
            day,
            noteid,
            note
        })
    }   

    // Function that handles closing the note modal
    const handleCloseNoteModal = (note) => {
        if(note) {
            setLocalNote(note)
        }
        setNoteModalData(false)
    }

   // Function to handle the mouse wheel click for deleting a note stack    
   const handleMouseDown = (e) => {
       // Checks if the button is scroll wheel and that it indeed is a stack of notes
        if (e.button === 1 && indices.length > 1) {
            // Prevents from creating that scroll compass
            e.preventDefault()
            
            deleteLocalDayNoteStack({
                noteIndices,
                indexNotes,
                notes,
                setLocalNoteIndices,
                setLocalNotes,
                noteid,
                note
            })
            
            deleteNoteStack({
                day,
                noteid,
                weekid,
                note 
            })
        }
    }

   // Function to initiate the drag
   const handleDragStart = (e) => {
        // Removing the image that usually comes when dragging an element 
        let img = new Image()
        e.dataTransfer.setDragImage(img, 1, 1)
    
        setDragNoteObj({
            day, 
            indices,
            note,
            index
        })
        
   }
   

   const handleDragEnter = (e) => {
       // The note indices just below and above the drag note
       var dragHighest = dragNoteObj ? Math.max(...dragNoteObj.indices)+1 : ''
       var dragLowest = dragNoteObj ? Math.min(...dragNoteObj.indices)-1 : ''
       
       if (localIndices.length > 1) {
           // The current note on which the drag has landed upon is longer than 1 
            var indicesHighest = Math.max(...localIndices) 
            var indicesLowest = Math.min(...localIndices)

            
            if (dragHighest === indicesLowest) {
                // Dragging downwards
               
                // Adding indices from the note that was dragged upon to the dragNote object
                localIndices.forEach((i) => {
                    dragNoteObj.indices.push(parseInt(i))
                })
                
                // Dismounting the note that was dragged upon
                setDragNoteObj({
                    day,
                    indices: dragNoteObj.indices,
                    index: dragNoteObj.index,
                    note: dragNoteObj.note
                })
                setLocalIndices(false)

                localDaySave({
                    dragNoteObj,
                    indexNotes,
                    noteIndices,
                    notes,
                    setLocalNoteIndices,
                    setLocalNotes
                })
                
            } else if (dragLowest === indicesHighest) {
                // Dragging upwards

                // Adding indices from the note that was dragged upon to the dragNote object
                localIndices.forEach((i) => {
                    dragNoteObj.indices.push(parseInt(i))
                })

                // Setting the dragNote index to the index of note that was dragged upon
                dragNoteObj["index"] = index

                // Setting the dragNote as the new local note
                setLocalIndices(dragNoteObj.indices)

                setDragNoteObj({
                    day,
                    indices: dragNoteObj.indices,
                    index: dragNoteObj.index,
                    note: dragNoteObj.note
                })

                localDaySave({
                    dragNoteObj,
                    indexNotes,
                    noteIndices,
                    notes,
                    setLocalNoteIndices,
                    setLocalNotes
                })
            }
             
            setDragNoteObj(dragNoteObj)
       } else if (localIndices.length === 1) {
            // The current note on which the drag has landed upon is 1 note long

            if (index === dragHighest) {
                // Dragging downards
                
                // Adding the note that was dragged upon to the dragNote indices
                dragNoteObj.indices.push(index)

                // Dismounting the local note
                setLocalIndices(false)
                setDragNoteObj({
                    day,
                    indices: dragNoteObj.indices,
                    index: dragNoteObj.index,
                    note: dragNoteObj.note
                })

                localDaySave({
                    dragNoteObj,
                    indexNotes,
                    noteIndices,
                    notes,
                    setLocalNoteIndices,
                    setLocalNotes
                })
            } else if (index === dragLowest) {
                // Dragging upwards
                
                // Adding the note that was dragged upon to the dragNote indices
                dragNoteObj.indices.push(index)

                // Setting the index of the note that was dragged upon as the dragNote index
                dragNoteObj["index"] = index
                
                // Setting the drag note as the local note
                setLocalIndices(dragNoteObj.indices)

                setDragNoteObj({
                    day,
                    indices: dragNoteObj.indices,
                    index: dragNoteObj.index,
                    note: dragNoteObj.note
                })

                localDaySave({
                    dragNoteObj,
                    indexNotes,
                    noteIndices,
                    notes,
                    setLocalNoteIndices,
                    setLocalNotes
                })
            }
        }
    }
   
    return (
        <div>
            {localIndices !== false ?
                
                <div 
                    
                    id={`${day}_${index}`}
                    className="note-container" 
                    style={{
                        "height": `${localIndices && (localIndices.length > 1 ? localIndices.length === 2 ? '41' : 41+(localIndices.length-2)*22  : '19')}px`,
                        "whiteSpace": localIndices && (localIndices.length > 1 ? 'normal' : 'nowrap'),
                        "border": (!isDraggable && index === dragNoteObj.index) && 'solid 1px grey'
                    }}  
                    draggable={isDraggable}
                    onDragStart={handleDragStart}
                    onDragEnter={handleDragEnter}
                    onMouseDown={handleMouseDown}
                    onClick={() => setNoteModalData(true)} 
                >
                    {localNote}
                </div>
                : 
                null
            }

                
            {noteModalData && 
                
                <div className="note-modal-wrapper" id="myModal">
                <NoteModal 
                    closeModal={handleCloseNoteModal}
                    note={localNote}
                    saveNote={handleUpdateNote}
                    day={day}
                    noteid={noteid}
                    indices={Object.keys(indices)}
                    index={index}
                    weekid={weekid}
                />
                </div>
            }
        </div>
    )
}

// function isEqual (prevProps, nextProps) {
//     if (
//       prevProps.note === nextProps.note &&
//       prevProps.noteid === nextProps.noteid &&
//       prevProps.weekid === nextProps.weekid &&
//       JSON.stringify(prevProps.indices) === JSON.stringify(nextProps.indices) &&
//       JSON.stringify(prevProps.dragNoteObj) === JSON.stringify(nextProps.dragNoteObj) &&
//       JSON.stringify(prevProps.noteIndices) === JSON.stringify(nextProps.noteIndices) && 
//       JSON.stringify(prevProps.localNotes) === JSON.stringify(nextProps.localNotes) && 
//       JSON.stringify(prevProps.indexNotes) === JSON.stringify(nextProps.indexNotes) 
//     ) {
//       return true
//     } else {
//       return false
//     }
//   }  

// export default React.memo(Note, isEqual)

export default Note