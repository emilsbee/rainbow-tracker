// External imports
import React from 'react'

// Internal imports
import './Styles.scss'
import * as constants from './Styles.scss'
import { getStackHeight, CONSTANTS } from './helpers'

export const exportHeight = constants.noteHeight

const Note = ({note, max, min, onDragStart, onDragEnter, onClick, onMouseDown, loading}) => {
    
    if (loading) {
        return (
            <div
                id="note-container"
                style={{backgroundColor: '#E0E0E0', border: '#E0E0E0 0.5px solid'}}
            /> 
        )
    }

    if (max === min) {
        return (
        <div
            onClick={() => onClick(note)}
            id="note-container"
            draggable={true}
            onDragStart={(e) => onDragStart(e, note)}
            // onDragEnter={() => onDragEnter(note)} // slower but kinda smoother
            onDragOver={() => onDragEnter(note)} // fast drag but leaves tail
        >
                {note.note}
        </div>
        )
    }
    return (
        <div
            id="stack-container"
            style={{ 
                height: getStackHeight(max, min, CONSTANTS.NOTE_HEIGHT, CONSTANTS.NOTE_MARGIN_BOTTOM),
                WebkitLineClamp: max-min+1
            }}
            onClick={() => onClick(note)}
            onMouseDown={(e) => onMouseDown(e, note)}
            draggable={true}
            onDragStart={(e) => onDragStart(e, note)}
            // onDragEnter={() => onDragEnter(note)} // slower but kinda smoother
            onDragOver={() => onDragEnter(note)} // fast drag but leaves tail
        >
                {note.note}
        </div>
    );
}

export default Note;
