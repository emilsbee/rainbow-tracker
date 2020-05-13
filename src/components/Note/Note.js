// External imports
import React from 'react'

// Internal imports 

const Note  = ({ note, noteMultiplier }) => {

    return (
        <div>
            {note || note === '' ?
                <div 
                    style={
                    {
                        "width":"100px", 
                        "height": `${21*noteMultiplier + (noteMultiplier > 1 ? 2*noteMultiplier : 0)}px`,
                        "border":"#D3D3D3 0.5px solid", 
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