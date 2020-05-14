// External imports
import React from 'react'

// Internal imports 
import './note.scss'

const Note  = ({ note, noteMultiplier, onClick, day, noteid }) => {

    const handleDragStart = (e) => {
        let img = new Image()
        e.dataTransfer.setDragImage(img, 1, 1)
        
    }

    const handleDragEnter = (e) => {
        
    }

    const handleDragEnd = (e) => {
        
    }

    return (
        <div>
            {note || note === '' ?
                <div className="note-container" 
                    style={
                    {
                        "height": `${21*noteMultiplier + (noteMultiplier > 1 ? 2*noteMultiplier : 0)}px`,
                        "position": noteMultiplier > 1 ? "absolute" : '',
                        "left": noteMultiplier > 1 ? "152px" : '',
                        "top": noteMultiplier > 1 ? "30px" : ''
                    }}
                    draggable={true}
                    onDragStart={handleDragStart}
                    onDragEnter={handleDragEnter}
                    onDragEnd={handleDragEnd}
                    onClick={() => onClick({note, day, noteid})}
                >
                    {note}
                </div>
                : 
                null
            }
        </div>
    )
}

export default Note