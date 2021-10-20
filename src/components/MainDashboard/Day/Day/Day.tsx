// External imports
import React, {useState} from 'react'
import {DateTime, Info} from "luxon";

// Internal imports
import CategoryItem from '../Category/CategoryItem'
import NoteItem from '../Note/NoteItem'
import { findStackExtremes } from './helpers'
import NoteModal from '../Note/NoteModal/NoteModal'
import './Day.scss'
import {useStoreActions, useStoreState} from "../../../../store/hookSetup";
import {Note} from "../../../../store/notes/notes";
import {Category} from "../../../../store/categories/categories";
import AnalyticsPopover from "../AnalyticsPopover/AnalyticsPopover";
import {useKeyPress} from "../../../../hooks/useKeyPress";

type DayProps = {
    categories:Category[],
    notes:Note[],
    weekDay: number
}

/**
 * The Day component controls dragging and regular clicking
 * aspects of notes, categories and activities of the respective day.
 * So it holds the state necessary to make dragging possible. It is a wrapper
 * component.
 * @param categories The categories to display.
 * @param notes The notes to display.
 * @param weekDay The day.
 */
function Day({categories, notes, weekDay}: DayProps) {
    const controlPress = useKeyPress("Control")

    // Store state
    const currentDate = useStoreState(state => state.settings.currentDate)

    // Store actions
    const categoryDragSet = useStoreActions(actions => actions.categories.categoryDragSet)
    const aboveDifference = useStoreActions(actions => actions.notes.aboveDifference)
    const belowDifference = useStoreActions(actions => actions.notes.belowDifference)
    const setNoteText = useStoreActions(actions => actions.notes.setNoteText)
    const deleteNoteText = useStoreActions(actions => actions.notes.deleteNoteText)
    const deleteNoteStack = useStoreActions(actions => actions.notes.deleteNoteStack)
    const setHoverIndex = useStoreActions(actions => actions.settings.setHoverIndex)

    // Local state
    const [hoveringOverDayHeader, setHoveringOverDayHeader] = React.useState<boolean>(false)

    // Note modal logic
    const [noteModalData, setNoteModalData] = useState<Note | null>(null)

    const onNoteClick = (note: Note):void => {
        if (controlPress) {
            deleteNoteText(note)
        } else {
            setNoteModalData(note)
        }
    }

    const onNoteSave = (note: Note):void => {
        setNoteText(note)
        setNoteModalData(null)
    }

    const onNoteDeleteText = (note: Note):void => {
        deleteNoteText(note)
        setNoteModalData(null)
    }

    const onNoteDeleteStack = (note: Note) => {
        deleteNoteStack(note)
        setNoteModalData(null)
    }

    // Drag image
    const initDragImageState = ():HTMLImageElement => {
        // Initialise the drag "ghost" transparent image
        let dragImg: HTMLImageElement = new Image(0,0);
        dragImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        return dragImg
    }

    // CategoryType logic
    const [dragCategory, setDragCategory] = useState<Category | null>(null)

    const onCategoryDragStart = (e:  React.DragEvent<HTMLDivElement>, category: Category) => {
        e.dataTransfer.setDragImage(initDragImageState(), 1, 1) // Sets the ghost image

        setDragCategory(category) // Sets the category 
        setHoverIndex({timeHoverIndex: category.categoryPosition-1})
    }
    
    const onCategoryDragEnter = (category: Category) => {
        if (dragCategory) {
            categoryDragSet({
                dragPosition: dragCategory.categoryPosition,
                draggedIntoPosition: category.categoryPosition,
                weekDay,
                dragCategoryid: dragCategory.categoryid,
                dragActivityid: dragCategory.activityid
            })
        }
        setHoverIndex({timeHoverIndex: category.categoryPosition-1})
    }

    // Note logic
    const [dragNote, setDragNote] = useState<Note | null>(null)
    
    const onNoteDragStart = (e: React.DragEvent<HTMLDivElement>, note: Note) => {
        e.dataTransfer.setDragImage(initDragImageState(), 1, 1) // Sets the ghost image

        setDragNote(note) // Sets the initial drag note (local state)
        setHoverIndex({timeHoverIndex: note.notePosition-1})
    }

    const onNoteDragEnter = (note: Note) => {
        if (dragNote) { // Checks if the dragging comes from a note rather than a category
            const noteExtremes = findStackExtremes(notes, note.stackid)
            const dragExtremes = findStackExtremes(notes, dragNote.stackid)
            
            if (note.notePosition > dragExtremes.max) { // If drag downwards
                setHoverIndex({timeHoverIndex: dragExtremes.max})
                belowDifference({
                    draggedIntoPosition: note.notePosition,
                    dragPosition: dragNote.notePosition,
                    weekDay: note.weekDay,
                    dragStackid: dragNote.stackid,
                    oldStackid: note.stackid,
                    oldNote: note.note,
                }) 
            } else if (note.notePosition < dragExtremes.min) { // If drag upwards
                setHoverIndex({timeHoverIndex: dragExtremes.min-2})
                aboveDifference({
                    draggedIntoPosition: noteExtremes.max,
                    dragPosition: dragNote.notePosition,
                    weekDay: note.weekDay,
                    dragStackid: dragNote.stackid,
                    dragNoteText: dragNote.note
                })
            }
        }
    }

    // Delete note stack when mouse wheel is pressed on a stack
    const onNoteMouseDown = (e: React.MouseEvent, note: Note) => {
        const {max, min} = findStackExtremes(notes, note.stackid)
        if (e.button === 1 && controlPress && (max !== min)) {
            deleteNoteText(note)
            deleteNoteStack({
                weekDay: note.weekDay,
                stackid: note.stackid
            })
        } else if (e.button === 1 && (max!==min)) {
            deleteNoteStack({
                weekDay: note.weekDay,
                stackid: note.stackid
            })
        }
    }

    return (
        <div 
            className={"day-container"}
            onDragEndCapture={() => {
                setDragNote(null)
                setDragCategory(null)
            }}
        >
            {hoveringOverDayHeader && <AnalyticsPopover day={weekDay} weekNr={currentDate.weekNr} year={currentDate.year} />}

            <div className={`day-header ${weekDay}`} onMouseOver={() => setHoveringOverDayHeader(true)} onMouseLeave={() => setHoveringOverDayHeader(false)}>
                <p className={"day-header__day"}>{`${Info.weekdays()[weekDay]}`}</p>
                <p className={"day-header__date"}>{`${DateTime.fromISO(categories[0].weekDayDate).toLocaleString({month: "long", day: "numeric"})}`}</p>
            </div>

            <div className="composition-container">
                <div className="activity-outer-container">
                    {categories.map(category => {
                        return (
                            <CategoryItem
                                key={category.categoryPosition}
                                category={category} 
                                onDragStart={onCategoryDragStart}
                                onDragEnter={onCategoryDragEnter}
                            />
                        )
                    })}
                </div>
                
                <div className="note-outer-container">
                    
                    {notes.map((note: Note) => { // Iterates over all notes from the day

                        const {max, min} = findStackExtremes(notes, note.stackid) // Extremes of the note about to be rendered

                        if (note.notePosition === min) { // If the note is highest from notes with the same stackid
                            return (
                                <NoteItem
                                    key={note.notePosition}
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
                
                <div id="note-modal-wrapper" onClick={() => setNoteModalData(null)}>
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


// Memoization of the Day component to prevent the many unnecessary
// re-renders. This is because the data comes from parent component and all days
// are updated when something changes in one day since in easy-peasy notes is one big array.  
const areEqual = (prevProps: DayProps, nextProps: DayProps) => {
    return (
        JSON.stringify(prevProps.notes) === JSON.stringify(nextProps.notes) 
        && JSON.stringify(prevProps.categories) === JSON.stringify(nextProps.categories)
    )
}

export default React.memo(Day, areEqual);
