// External imports
import React, { useEffect, useState } from 'react'
import { useStoreActions } from 'easy-peasy'
import PropTypes from 'prop-types'

// Internal imports
import Category from '../Category/Category'
import Note from '../Note/Note'
import { findStackExtremes } from './helpers'
import NoteModal from '../Note/NoteModal/NoteModal'
import './Day.scss'

/**
 * The Day component controls dragging and regular clicking
 * aspects of notes, categories and activities of the respective day.
 * So it holds the state necessary to make dragging possible. It is a wrapper
 * component.
 * @param categories The categories to display.
 * @param notes The notes to display.
 * @param day The day.
 */
function Day({categories, notes, day}) {
    // Store actions
    const categoryDragSet = useStoreActions(actions => actions.activities.categoryDragSet)
    const aboveDifference = useStoreActions(actions => actions.notes.aboveDifference)
    const belowDifference = useStoreActions(actions => actions.notes.belowDifference)
    const setNoteText = useStoreActions(actions => actions.notes.setNoteText)
    const deleteNoteText = useStoreActions(actions => actions.notes.deleteNoteText)
    const deleteNoteStack = useStoreActions(actions => actions.notes.deleteNoteStack)
    const setHoverIndex = useStoreActions(actions => actions.settings.setHoverIndex)

    // Note modal logic
    const [noteModalData, setNoteModalData] = useState(false) 
    const onNoteClick = (note) => {
        setNoteModalData(note)
    }

    const onNoteSave = (note) => {
        setNoteText({
            position: note.position, 
            day: note.day,
            note: note.note,
        }) 
        setNoteModalData(false)
    }

    const onNoteDeleteText = (note) => {
        deleteNoteText({
            position: note.position, 
            day: note.day
        })
        setNoteModalData(false)
    }

    const onNoteDeleteStack = (note) => {
        deleteNoteStack({
            day: note.day,
            stackid: note.stackid,
            note: note.note
        })
        setNoteModalData(false)
    }

    // Drag image
    const [img, setImg] = useState(null)
    useEffect(() => {    
        // Initialise the drag "ghost" transparent image
        let dragImg = new Image(0,0);
        dragImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        setImg(dragImg)
    }, [])


    // CategoryType logic
    const [dragCategory, setDragCategory] = useState(null)

    const onCategoryDragStart = (e, category) => {
        e.dataTransfer.setDragImage(img, 1, 1) // Sets the ghost image
        setDragCategory(category) // Sets the category 
        setHoverIndex({timeHoverIndex: category.position-1})
    }
    
    const onCategoryDragEnter = (category) => {
        if (dragCategory) {
            categoryDragSet({
                dragPosition: dragCategory.position,
                draggedIntoPosition: category.position,
                day,
                dragCategoryid: dragCategory.categoryid,
                dragActivityid: dragCategory.activityid
            })
        }
        setHoverIndex({timeHoverIndex: category.position-1})
    }

    // Note logic
    const [dragNote, setDragNote] = useState(null)
    
    const onNoteDragStart = (e, note) => {
        e.dataTransfer.setDragImage(img, 1, 1) // Sets the ghost image
        setDragNote(note) // Sets the initial drag note (local state)
        setHoverIndex({timeHoverIndex: note.position-1})
    }

    const onNoteDragEnter = (note) => {
        if (dragNote) { // Checks if the dragging comes from a note rather than a category
            const noteExtremes = findStackExtremes(notes, note.stackid)
            const dragExtremes = findStackExtremes(notes, dragNote.stackid)
            
            if (note.position > dragExtremes.max) { // If drag downwards
                setHoverIndex({timeHoverIndex: dragExtremes.max})
                belowDifference({
                    draggedIntoPosition: note.position,
                    dragPosition: dragNote.position,
                    day: note.day,
                    dragStackid: dragNote.stackid,
                    oldStackid: note.stackid,
                    oldNote: note.note 
                }) 
            } else if (note.position < dragExtremes.min) { // If drag upwards
                setHoverIndex({timeHoverIndex: dragExtremes.min-2})
                aboveDifference({
                    draggedIntoPosition: noteExtremes.max,
                    dragPosition: dragNote.position,
                    day: note.day,
                    dragStackid: dragNote.stackid,
                    dragNoteText: dragNote.note
                })
            }
        }
    }

    // Delete note stack when mouse wheel is pressed on a stack
    const onNoteMouseDown = (e, note) => {
        const {max, min} = findStackExtremes(notes, note.stackid)
        if (e.button === 1 && (max!==min)) {
            deleteNoteStack({
                day: note.day,
                stackid: note.stackid
            })
        }
    }

    return (
        <div 
            className="day-container" 
            onDragEndCapture={() => {
                setDragNote(null)
                setDragCategory(null)
            }}
        >
            <div className="day-header">
                {day}
            </div>

            <div className="composition-container">
                <div className="activity-outer-container">
                    {categories.map(category => {
                        return (
                            <Category 
                                key={category.position} 
                                category={category} 
                                onDragStart={onCategoryDragStart}
                                onDragEnter={onCategoryDragEnter}
                            />
                        )
                    })}
                </div>
                
                <div className="note-outer-container">
                    
                    {notes.map(note => { // Iterates over all notes from the day

                        const {max, min} = findStackExtremes(notes, note.stackid) // Extremes of the note about to be rendered

                        if (note.position === min) { // If the note is highest from notes with the same stackid 
                            return (
                                <Note 
                                    key={note.position}
                                    note={note}
                                    max={max}
                                    min={min}
                                    onDragStart={onNoteDragStart}
                                    onDragEnter={onNoteDragEnter}
                                    onClick={onNoteClick}
                                    onMouseDown={onNoteMouseDown}
                                />
                            )
                        } else { // If the note is part of a stack but is not the upmost note
                            return null
                        }
                    })}
                </div>
            </div>

            {noteModalData && 
                
                <div id="note-modal-wrapper">
                        <NoteModal 
                            stack={findStackExtremes(notes, noteModalData.stackid).max !== findStackExtremes(notes, noteModalData.stackid).min} // Determines whether note is a stack or not. True is stack, false otherwise
                            deleteStack={onNoteDeleteStack}
                            deleteText={onNoteDeleteText}
                            saveNote={onNoteSave}
                            note={noteModalData}
                        />
                </div>
            }
        </div>
    );
}


// Memoization of the Day component to prevent the many uncessary 
// re-renders. This is because the data comes from parent component and all days
// are updated when something changes in one day since in easy-peasy notes is one big array.  
const areEqual = (prevProps, nextProps) => {
    return (
        JSON.stringify(prevProps.notes) === JSON.stringify(nextProps.notes) 
        && JSON.stringify(prevProps.categories) === JSON.stringify(nextProps.categories)
    )
}

Day.propTypes = {
    day: PropTypes.oneOf(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]).isRequired,
    notes: PropTypes.arrayOf(PropTypes.exact({
        day: PropTypes.oneOf(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]).isRequired,
        note: PropTypes.string.isRequired,
        position: PropTypes.oneOf(Array.from({length: 96}, (_, i) => i + 1)).isRequired,
        stackid: PropTypes.string.isRequired
    })).isRequired,
    categories: PropTypes.arrayOf(PropTypes.exact({
        activityid: PropTypes.string.isRequired,
        categoryid: PropTypes.string.isRequired,
        day: PropTypes.oneOf(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]).isRequired,
        position: PropTypes.oneOf(Array.from({length: 96}, (_, i) => i + 1)).isRequired
    }))
}

export default React.memo(Day, areEqual);
