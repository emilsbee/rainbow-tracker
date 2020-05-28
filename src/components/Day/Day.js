// External imports
import React, { useState, useEffect } from 'react'


// Internal imports
import './day.scss'
import CategoryItem from '../CategoryItem/CategoryItem'
import Note from '../Note/Note'



const Day = ({
    weekid,
    day,
    categories,
    notes,
    noteIndices,
    indexNotes
}) => {
    // For categories
    const [dragDay, setDragDay] = useState(false)
    const [dragCategory, setDragCategory] = useState("")
    const [dragActivity, setDragActivity] = useState("")
    const [draggedCategories, setDraggedCategories] = useState([])
    const [dragIndex, setDragIndex] = useState('')

    
    // For notes
    const [localNotes, setLocalNotes] = useState(false)
    const [localIndexNotes, setLocalIndexNotes] = useState(false)    
    const [dragNoteObj, setDragNoteObj] = useState(false) 
    const [localNoteIndices, setLocalNoteIndices] = useState(false)
    
    useEffect(() => {
        setLocalNotes(notes)
        setLocalNoteIndices(noteIndices)
        setLocalIndexNotes(indexNotes)
    }, [noteIndices, notes, indexNotes])

    const handleSetDragNoteObj = (data) => { 
        setDragNoteObj(data)
    }
    
    const handleSetLocalNoteIndices = (data) => {
        setLocalNoteIndices(data)
    }   
    
    return (
        <div >
            {categories.map((period, index) => {
                
                var noteid = localIndexNotes[index]
                var noteText = localNotes[noteid]
                
                var isFirst = false
                
                if (localNoteIndices[noteid]) {
                    var notesIndices = []

                    Object.keys(localNoteIndices[noteid]).forEach((i) => {
                        notesIndices.push(parseInt(i))
                    })

                    if (Math.min(...notesIndices) === index) {
                        isFirst = true
                    } 
                        
                }
                
                return (

                    <div key={index} className="category-note-container">
                        <CategoryItem 
                            className="category-cell"
                            weekid={weekid} 
                            day={day} 
                            index={index} 
                            category={period.category}
                            activity={period.activity}
                            setDragCategory={setDragCategory}
                            dragCategory={dragCategory}
                            dragActivity={dragActivity}
                            setDragActivity={setDragActivity}
                            draggedCategories={draggedCategories}
                            setDraggedCategories={setDraggedCategories}
                            setDragIndex={setDragIndex}
                            dragDay={dragDay}
                            setDragDay={setDragDay}
                        >
                        </CategoryItem>
                        {isFirst && <Note 
                            dragNoteObj={dragNoteObj}
                            index={index}
                            note={noteText} 
                            noteid={noteid}
                            day={day}
                            weekid={weekid}
                            indices={notesIndices} 
                            noteIndices={noteIndices}
                            localNotes={localNotes}
                            indexNotes={localIndexNotes}
                            
                            setDragNoteObj={handleSetDragNoteObj}
                            setLocalNoteIndices={handleSetLocalNoteIndices}
                            setLocalNotes={setLocalNotes}
                        />}
                        </div>
                )

            })}
        </div>
    )
}

// function areEqual (prevProps, nextProps) {
//     if (
//       prevProps.weekid === nextProps.weekid &&
//       prevProps.day === nextProps.day &&
//       JSON.stringify(prevProps.categories) === JSON.stringify(nextProps.categories) &&
//       JSON.stringify(prevProps.notes) === JSON.stringify(nextProps.notes) &&
//       JSON.stringify(prevProps.noteIndices) === JSON.stringify(nextProps.noteIndices) &&
//       JSON.stringify(prevProps.indexNotes) === JSON.stringify(nextProps.indexNotes) 
//     ) {
//       return true
//     } else {
//       return false
//     }
    
//   }

// export default React.memo(Day, areEqual)

export default Day