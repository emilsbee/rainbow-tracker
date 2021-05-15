// External imports
import React from 'react'
import { useStoreActions } from 'easy-peasy'
import PropTypes from 'prop-types'

// Internal imports
import './Note.scss'
import { getStackHeight, CONSTANTS } from './helpers'



const Note = ({note, max, min, onDragStart, onDragEnter, onClick, onMouseDown}) => {
    const setHoverIndex = useStoreActions(actions => actions.settings.setHoverIndex)

    if (max === min) {
        return (
        <div
            onMouseOver={() => setHoverIndex({timeHoverIndex: min-1})}
            onClick={() => onClick(note)}
            id="note-container"
            draggable={true}
            onDragStart={(e) => onDragStart(e, note)}
            // onDragEnter={() => onDragEnter(note)} // slower but kinda smoother
            onDragOver={() => onDragEnter(note)} // fast drag but leaves tail
            style={{textOverflow: "ellipsis"}}
        >
                {note.note}
        </div>
        )
    }
    return (
        <div
            onMouseOver={() => setHoverIndex({timeHoverIndex: min-1})}
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

Note.propTypes = {
    note: PropTypes.exact({
        day: PropTypes.oneOf(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]).isRequired,
        note: PropTypes.string.isRequired,
        position: PropTypes.oneOf(Array.from({length: 96}, (_, i) => i + 1)).isRequired,
        stackid: PropTypes.string.isRequired
    }).isRequired, 
    max: PropTypes.number.isRequired, 
    min: PropTypes.number.isRequired, 
    onDragStart: PropTypes.func.isRequired, 
    onDragEnter: PropTypes.func.isRequired, 
    onClick: PropTypes.func.isRequired, 
    onMouseDown: PropTypes.func.isRequired,  
}

export default Note;
