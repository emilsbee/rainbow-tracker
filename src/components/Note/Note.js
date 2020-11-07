// External imports
import React from 'react'

// Internal imports
import './Styles.scss'
import * as constants from './Styles.scss'
import { getStackHeight, CONSTANTS } from './helpers'

export const exportHeight = constants.noteHeight

const Note = ({note, max, min, onDragStart, onDragEnter}) => {
    // const height = constants.noteHeight
    // const marginBottom = constants.noteMarginBottom
    

    if (max === min) {
        return (
        <div
            id="note-container"
            draggable={true}
            onDragStart={(e) => onDragStart(e, note)}
            onDragEnter={() => onDragEnter(note)} // slower but kinda smoother
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
            draggable={true}
            onDragStart={(e) => onDragStart(e, note)}
            onDragEnter={() => onDragEnter(note)} // slower but kinda smoother
            onDragOver={() => onDragEnter(note)} // fast drag but leaves tail
        >
                {note.note}
        </div>
    );
}

export default Note;
