import React, { useEffect, useState } from 'react'
import Category from '../Category/Category'
import { useStoreActions } from 'easy-peasy'
import Note from '../Note/Note'
import { findStackExtremes } from './helpers'


import './day.scss'

function Day({activities, notes, day}) {
    // Easy-peasy actions
    const setActivity = useStoreActions(actions => actions.activities.setActivity)
    const setNote = useStoreActions(actions => actions.activities.setNote)

    const [img, setImg] = useState(null)
    useEffect(() => {    
        // Initialise the drag "ghost" transparent image
        let dragImg = new Image(0,0);
        dragImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        setImg(dragImg)
    }, [])


    // Category logic
    const onCategoryDragStart = (e, activity) => {
        e.dataTransfer.setDragImage(img, 1, 1) // Sets the ghost image
        // Sets the drag note null (local state) to not interfere 
        //with notes when dragging categories and going over notes
        setDragNote(null) 
        setActivity({activity}) // Sets the activity 
    }
    
    // Note logic
    const [dragNote, setDragNote] = useState(null)
    
    const onNoteDragStart = (e, note) => {
        e.dataTransfer.setDragImage(img, 1, 1) // Sets the ghost image
        setDragNote(note) // Sets the initial drag note (local state)
    }

    const onNoteDragEnter = (note) => {
        if (dragNote) { // Checks if the dragging comes from a note rather than a category
            const dragExtremes = findStackExtremes(notes, dragNote.stackid)
            const noteExtremes = findStackExtremes(notes, note.stackid)
            if (noteExtremes.min === dragExtremes.max+1 || noteExtremes.max === dragExtremes.min - 1) { // Checks if the note dragged onto is one above or below the note being dragged
                if (note.position < dragNote.position) { // If the note is being dragged upwards 
                    // Edits the note above to have stackid of drag note. 
                    // If the note above is a stack it updates the lowest note, meaning the one closest to drag note. 
                    setNote({
                        stackid: dragNote.stackid, 
                        position: noteExtremes.max, 
                        day: note.day,
                        note: dragNote.note,
                    }) 
                } else { // If the note is being dragged downwards
                    // Edits the note below to have stackid of drag note. 
                    // If the note below is a stack, it updates the most upper one, meaning the one closest to drag note.
                    setNote({
                        stackid: dragNote.stackid, 
                        position: note.position, 
                        day: note.day,
                        note: dragNote.note,
                    })
                }
            }
        }
        
    }
    return (
        <div className="day-container">
            <div className="day-header">
                {day}
            </div>

            <div className="composition-container">
                <div className="activity-container">
                    {activities.map(activity => {
                        return (
                            <Category 
                                key={activity.position} 
                                activity={activity} 
                                onClick={(activity) => setActivity({activity})} 
                                onDragStart={(e, activity) => onCategoryDragStart(e, activity)}
                                onDragEnter={(activity) => setActivity({activity})}
                            />
                        )
                    })}
                </div>
                
                <div className="note-container" style={{width: '115px', display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}>
                    {notes.map(note => {
                        const {max, min} = findStackExtremes(notes, note.stackid)
                        if (note.position === min) { // If the note is highest from notes with the same stackid 
                            return (
                                <Note 
                                    key={note.position}
                                    note={note}
                                    max={max}
                                    min={min}
                                    onDragStart={onNoteDragStart}
                                    onDragEnter={onNoteDragEnter}
                                />
                            )
                        } else { // If the note is part of a stack but is not the upmost note
                            return null
                        }
                    })}
                </div>
            </div>
        </div>
    );
}



const areEqual = (prevProps, nextProps) => {
    return (
        JSON.stringify(prevProps.notes) === JSON.stringify(nextProps.notes) 
        && JSON.stringify(prevProps.activities) === JSON.stringify(nextProps.activities)
    )
}

export default React.memo(Day, areEqual);
