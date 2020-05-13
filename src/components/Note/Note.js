// External imports
import React from 'react'

// Internal imports 
import './note.scss'

const Note  = ({ note, noteMultiplier }) => {
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
                    }
                    }
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