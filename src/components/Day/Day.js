// External imports
import React, { useState, useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useBeforeunload } from 'react-beforeunload';

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
    // Store actions
    const setNotes = useStoreActions(actions => actions.weeks.setNotes)
    const updateNewNotes = useStoreActions(actions => actions.weeks.updateNewNotes)
    const setTimeHoverIndex = useStoreActions(actions => actions.weeks.setTimeHoverIndex)

    // Local state for categories
    const [dragDay, setDragDay] = useState(false)
    const [dragCategory, setDragCategory] = useState("")
    const [dragActivity, setDragActivity] = useState("")
    const [draggedCategories, setDraggedCategories] = useState([])
    

    
    // Local state for notes
    const [localNotes, setLocalNotes] = useState(false) 
    const [dragNoteObj, setDragNoteObj] = useState(false) 
    const [localNoteIndices, setLocalNoteIndices] = useState(false)
    const [isDraggable, setIsDraggable] = useState(true)

   useEffect(() => {
    return () => {
        
        updateNewNotes({
            day, 
            weekid,
            localNoteIndices: noteIndices,
            localNotes: notes
         })
    }
    
   }, [])
    
    
    useBeforeunload(() => {
        updateNewNotes({
            day, 
            weekid,
            localNoteIndices,
            localNotes
         })
    })

    // Checks for updates of noteIndices and notes from the maindashboard 
    useEffect(() => {
        setLocalNotes(notes)
        setLocalNoteIndices(noteIndices)
    }, [noteIndices, notes])


    // Checks for a change in the dragNote
    // This is necessary because when a component unmounts it no longer 
    // can perform onDragEnd, hence every time the drag note changes 
    // the dragend listener is attached to the new DOM node 
    useEffect(() => {
        if (dragNoteObj !== false) {
            // Finds the DOM node with current dragNote id 
            var el = document.getElementById(`${dragNoteObj.day}_${dragNoteObj.index}`)
            
            // Attaches a listener to the current dragNote node
            el.addEventListener('dragend', handleDragEnd)
        }
    }, [dragNoteObj])
    

    function handleDragEnd () {
        // setIsDraggable(false)
        // updateNotes({
        //     day: dragNoteObj.day,
        //     weekid,
        //     draggedIndices: dragNoteObj.indices,
        //     note: dragNoteObj.note
        //  }).then(() => {
        //      getNotes({weekid}).then(() => {        
        //         setDragNoteObj(false)
        //         setIsDraggable(true)
        //      })
        //  })
        
        setNotes({
            type: 'SPECIAL',
            noteIndices: localNoteIndices,
            notes: localNotes,
            day
        })
    }
    
    const handleSetLocalNoteIndices = (data) => {
        
        setLocalNoteIndices(data)
    }
 
    const handleSetLocalNotes = (data) => {
        setLocalNotes(data)
    }

    const handleSetDragNoteObj = (data) => {
        setDragNoteObj(data)
    }
    
    return (
        <div >
            {indexNotes && localNoteIndices && localNotes &&  categories.map((period, index) => {
                
                var noteid = indexNotes[index]
                var noteText = localNotes[noteid]
                
                // Variable for determening if a note is with lowest index, henceforth must be rendered
                var isFirst = false
                
                // Variable for holding the integer values of indices of the current note
                var notesIndices = []
                         
                if (localNoteIndices[noteid]) {
                    // Iterting through the indices and pushing their integer version to the notesIndices array
                    Object.keys(localNoteIndices[noteid]).forEach((i) => {

                        notesIndices.push(parseInt(i))
                    })

                    // determening whether the note's index is lowest in its indices
                    if (Math.min(...notesIndices) === index) {
                            isFirst = true
                    } 
                }
                
                return (
                    <div key={index} className="category-note-container" onMouseEnter={() => setTimeHoverIndex({index})}>
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
                            setDragIndex={setTimeHoverIndex}
                            dragDay={dragDay}
                            setDragDay={setDragDay}
                        >
                        </CategoryItem>
                        {isFirst && <Note 
                            dragNoteObj={dragNoteObj}
                            index={index}
                            note={noteText} 
                            noteid={noteid}s
                            day={day}
                            weekid={weekid}
                            indices={notesIndices} 
                            noteIndices={localNoteIndices}
                            notes={localNotes}
                            indexNotes={indexNotes}
                            isDraggable={isDraggable}
                            
                            setDragIndex={setTimeHoverIndex}
                            setDragNoteObj={handleSetDragNoteObj}
                            setLocalNoteIndices={handleSetLocalNoteIndices}
                            setLocalNotes={handleSetLocalNotes}
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