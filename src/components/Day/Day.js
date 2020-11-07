// External imports
import React, { useEffect, useState } from 'react'
import { useStoreActions } from 'easy-peasy'

// Internal imports
import Category from '../Category/Category'
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
        setActivity({activity}) // Sets the activity 
    }
    
    const onCategoryDragEnter = (activity) => {
        setActivity({activity})
    }

    const onCategoryClick = (activity) => {
        setActivity({activity})
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

            if (note.position < dragNote.position) { // If the note is being dragged upwards 

                // Edits the note(s) above to have stackid and note text of drag note. 
                // It is possible that this note is not right next to the drag note,
                // if that's the case, the setNote action will take care of that and update 
                // the notes inbetween drag note and the note dragged onto.
                setNote({
                    stackid: dragNote.stackid, 
                    position: noteExtremes.max, 
                    day: note.day,
                    note: dragNote.note,
                    max: dragExtremes.max, 
                    min: dragExtremes.min,
                    dragPosition: dragNote.position
                }) 
            } else { // If the note is being dragged downwards

                // Edits the note below to have stackid of drag note. 
                // If the note below is a stack, it updates the most upper one, meaning the one closest to drag note.

                // Edits the note(s) below to have stackid and note text of drag note.
                // It is possible that this note is not right next to the drag note, 
                // if that's the case, the setNote action will take care of that and update 
                // the notes inbetween drag note and the note dragged onto.
                setNote({
                    stackid: dragNote.stackid, 
                    position: note.position, 
                    day: note.day,
                    note: dragNote.note,
                    max: dragExtremes.max, 
                    min: dragExtremes.min,
                    dragPosition: dragNote.position
                })
            }
        }
        
    }
    return (
        <div className="day-container" onDragEndCapture={() => setDragNote(null)}>
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
                                onClick={onCategoryClick} 
                                onDragStart={onCategoryDragStart}
                                onDragEnter={onCategoryDragEnter}
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
