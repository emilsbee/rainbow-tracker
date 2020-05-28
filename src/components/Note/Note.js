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
    localNotes,
    dragNoteObj,
    noteIndices,
    indexNotes,

    setLocalNoteIndices,
    setDragNoteObj,
    setLocalNotes
}) => {
    
    const updateWeek = useStoreActions(actions => actions.weeks.updateWeek)
    const getNotes = useStoreActions(actions => actions.weeks.getNotes)
    const updateNotes = useStoreActions(actions => actions.weeks.updateNotes)
    const deleteNoteStack = useStoreActions(actions => actions.weeks.deleteNoteStack)


    const[noteModalData, setNoteModalData] = useState(false)
    const[localNote, setLocalNote] = useState(note)
    const[localIndices, setLocalIndices] = useState(false)

    const[localRef, setLocalRef] = useState(false)
    const[isDraggable, setIsDraggable] = useState(true)

    useEffect(() => {
        setLocalNote(note)
    }, [note])

    useEffect(() => {
        setLocalIndices(indices)
    }, [indices])

    useEffect(() => {
        if(dragNoteObj && (dragNoteObj.index === index)) {
            setLocalIndices(dragNoteObj.indices)
        } else if (dragNoteObj && dragNoteObj.indices.includes(index)) {
            setLocalIndices(false)
        }
    }, [dragNoteObj])



    const handleUpdateNote = ({ day, noteid, note, index }) => {
        updateWeek({
            type: 'UPDATE_NOTE',
            weekid,
            day,
            noteid,
            note
        })
        getNotes({weekid})
    }   



   const handleDragStart = (e) => {
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
    
        localRef.addEventListener('dragend', handleDragEnd)

        if (dragNoteObj !== false && dragNoteObj.index !== index) {

                // Checks if the note which was entered is of length 1 or more
                if (indices.length > 1) {
                    
    

                    var newMultiIndiceObj = dragNoteObj
                    indices.forEach((i) => {
                        newMultiIndiceObj.indices.push(parseInt(i))
                    })
                    
                    if (dragNoteObj.index > index) {
                        newMultiIndiceObj["index"] = index
                        setLocalIndices(dragNoteObj.indices)
                    } else {
                        setLocalIndices(false)
                    }
                    setDragNoteObj(newMultiIndiceObj)
                } else {
                    if (!dragNoteObj.indices.includes(index)) {
                        var newObj = dragNoteObj
                        newObj.indices.push(parseInt(index))
                        if (dragNoteObj.index > index) {
                            newObj["index"] = index
                            setLocalIndices(dragNoteObj.indices)
                        } else {
                            setLocalIndices(false)
                        }
                        console.log(newObj)
                        setDragNoteObj(newObj)
                    }
                }

                setDragNoteObj({
                    day,
                    indices: dragNoteObj.indices,
                    note: dragNoteObj.note,
                    index: dragNoteObj.index
                })
                
                
        }

   }


   function handleDragEnd () {
       if (dragNoteObj) {
           setIsDraggable(false) 
           updateNotes({
               day: dragNoteObj.day,
               weekid,
               draggedIndices: dragNoteObj.indices,
               note: dragNoteObj.note
            }).then(() => {
                getNotes({weekid}).then(() => {
                    // setLocalIndices(false)
                    setIsDraggable(true)
                })
            })
            
 
       }
       
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
           getNotes({weekid})
       }
   }
   
   const handleCloseNoteModal = (note) => {
       
        if(note) {
            setLocalNote(note)
        }
        
        setNoteModalData(false)
        getNotes({weekid})
   }

    return (
        <div>
            {localIndices !== false ?
                
                <div 
                    ref={refHandler}
                    className="note-container" 
                    style={{
                        "height": `${localIndices && (localIndices.length > 1 ? localIndices.length === 2 ? '41' : 41+(localIndices.length-2)*22  : '19')}px`,
                        "whiteSpace": localIndices && (localIndices.length > 1 ? 'normal' : 'nowrap')
                    }}  
                    draggable={isDraggable}
                    onDragStart={handleDragStart}
                    onDragEnter={handleDragEnter}
                    onMouseUp={handleDragEnd}
                    onDragLeave={handleDragExit}
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