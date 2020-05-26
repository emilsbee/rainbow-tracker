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
    indexNotes
}) => {
    // if (dragNoteObj && index === Math.min(...dragNoteObj.indices)) console.log(localIndices)
    // if (dragNoteObj && index === Math.min(...dragNoteObj.indices)) console.log('rendered')
    // if (day === 'Monday' && index === 0) console.log('rendered')
    const updateWeek = useStoreActions(actions => actions.weeks.updateWeek)


    const[noteModalData, setNoteModalData] = useState(false)
    const[localNote, setLocalNote] = useState(note)
    const[localIndices, setLocalIndices] = useState(false)

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
        setDragNoteObj({
            day, 
            indices: [parseInt(index)],
            note
        })
        
   }
   
   const handleDragEnter = () => {
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

        }
        
   }

   const handleDragEnd = () => {
       console.log(dragNoteObj)
   }
   
    return (
        // style={{"alignSelf":"start"}}
        <div>
            {localNote !== false ?
            
                <div 
                    className="note-container" 
                    style={{
                        "height": `${indices && (indices.length > 1 ? indices.length === 2 ? '41' : 41+(indices.length-2)*22  : '19')}px`,
                        "whiteSpace": indices && (indices.length > 1 ? 'normal' : 'nowrap')
                    }}  
                    draggable={true}
                    onDragStart={handleDragStart}
                    onDragEnter={handleDragEnter}
                    onDragEnd={handleDragEnd}
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