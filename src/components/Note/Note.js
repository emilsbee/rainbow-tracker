// External imports
import React, { useState, useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports 
import './note.scss'
import NoteModal from '../NoteModal/NoteModal'

const Note  = ({ 
    note, 
    indices, 
    noteid, 
    day, 
    weekid, 
    index,
    setDragNoteObj,
    dragNoteObj,
    noteIndices,
    setLocalNoteIndices,
    indexNotes,
    localNotes,
    setLocalNotes
}) => {
    const updateWeek = useStoreActions(actions => actions.weeks.updateWeek)
    const updateNotes = useStoreActions(actions => actions.weeks.updateNotes)
    const deleteNoteStack = useStoreActions(actions => actions.weeks.deleteNoteStack)


    const[noteModalData, setNoteModalData] = useState(false)
    const[localNote, setLocalNote] = useState(note)
    const[localIndices, setLocalIndices] = useState(false)

    const[localRef, setLocalRef] = useState(false)

    useEffect(() => {
        setLocalNote(note)
    }, [note])

    useEffect(() => {
        
        if (dragNoteObj !== false && dragNoteObj.indices.includes(index) && day === dragNoteObj.day) {
            if (index !== Math.min(...dragNoteObj.indices)) {
                // setLocalNote(false)
            } else {
                
                setLocalIndices(dragNoteObj.indices)
            }
        }
    }, [noteIndices])

    const handleUpdateNote = ({ day, noteid, note, index }) => {
        updateWeek({
            type: 'UPDATE_NOTE',
            weekid,
            day,
            noteid,
            note
        })
    }   

   const handleDragStart = (e) => {
        let img = new Image()
        e.dataTransfer.setDragImage(img, 1, 1)
        
        window.addEventListener('dragend',  handleDragEnd)
        setDragNoteObj({
            day, 
            indices,
            note
        })
        
   }
   
   

   const handleDragEnter = (e) => {
        localRef.addEventListener('dragend', handleDragEnd)
        if (dragNoteObj !== false && day === dragNoteObj.day) {

                if (!dragNoteObj.indices.includes(index)) {
                    var newObj = dragNoteObj
                    newObj.indices.push(parseInt(index))
                    setDragNoteObj(newObj)
                }

                setDragNoteObj({
                    day,
                    indices: dragNoteObj.indices,
                    note: dragNoteObj.note
                })
                
                var dragNoteIndiceObj = {}
                dragNoteObj.indices.forEach(indice => {
                    dragNoteIndiceObj[indice] = true
                })
                
                for (var i in dragNoteObj.indices) {
                    noteIndices[dragNoteObj.day][indexNotes[dragNoteObj.day][dragNoteObj.indices[i]]] = dragNoteIndiceObj
                    localNotes[dragNoteObj.day][indexNotes[dragNoteObj.day][dragNoteObj.indices[i]]] = dragNoteObj.note
                }
                setLocalNoteIndices({
                    Monday: noteIndices.Monday,
                    Tuesday: noteIndices.Tuesday,
                    Wednesday: noteIndices.Wednesday,
                    Thursday: noteIndices.Thursday,
                    Friday: noteIndices.Friday,
                    Saturday: noteIndices.Saturday,
                    Sunday: noteIndices.Sunday,
                })

                setLocalNotes({
                    Monday: localNotes.Monday,
                    Tuesday: localNotes.Tuesday,
                    Wednesday: localNotes.Wednesday,
                    Thursday: localNotes.Thursday,
                    Friday: localNotes.Friday,
                    Saturday: localNotes.Saturday,
                    Sunday: localNotes.Sunday,
                })

        }

   }


   function handleDragEnd () {
       if (dragNoteObj) {
           updateNotes({
               day: dragNoteObj.day,
               weekid,
               draggedIndices: dragNoteObj.indices,
               note: dragNoteObj.note
            })
       }
       setDragNoteObj(false)
   }

   const handleDragExit = () => {
       localRef.removeEventListener('dragend', handleDragEnd)
   }

   const refHandler = (e) => {
       setLocalRef(e)
   }

   const handleMouseDown = (e) => {
       if (e.button === 1) {
           e.preventDefault()
           deleteNoteStack({
               day,
               noteid,
               weekid,
               note 
           })
       }
   }
   
    return (
        <div>
            {localNote !== false ?
            
                <div 
                    ref={refHandler}
                    className="note-container" 
                    style={{
                        "height": `${indices && (indices.length > 1 ? indices.length === 2 ? '41' : 41+(indices.length-2)*22  : '19')}px`,
                        "whiteSpace": indices && (indices.length > 1 ? 'normal' : 'nowrap')
                    }}  
                    draggable={true}
                    onDragStart={handleDragStart}
                    onDragEnter={handleDragEnter}
                    onMouseUp={handleDragEnd}
                    onDragLeave={handleDragExit}
                    onMouseDown={handleMouseDown}
                    onClick={() => setNoteModalData(true)} 
                >
                    {note}
                </div>
                : 
                null
            }


            {noteModalData && 
                <div className="note-modal-wrapper" id="myModal">
                <NoteModal 
                    closeModal={() => setNoteModalData(false)}
                    note={note}
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

// function areEqual (prevProps, nextProps) {
//     if (
//       prevProps.note === nextProps.note &&
//       prevProps.noteid === nextProps.noteid &&
//       prevProps.day === nextProps.day &&
//       prevProps.weekid === nextProps.weekid &&
//       JSON.stringify(prevProps.indices) === JSON.stringify(nextProps.indices) &&
//       JSON.stringify(prevProps.dragNoteObj) === JSON.stringify(nextProps.dragNoteObj) &&
//       JSON.stringify(prevProps.localNoteIndices) === JSON.stringify(nextProps.localNoteIndices) 
//     ) {
//       return true
//     } else {
//       return false
//     }
    
//   }  

// export default React.memo(Note, areEqual)
export default Note