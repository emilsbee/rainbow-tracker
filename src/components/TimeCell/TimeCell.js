// External imports
import React from 'react'

// Internal imports 
import './time-cell.scss'

const TimeCell  = ({ timeValues }) => {

    return (
        <div className="time-cell-container">
        {timeValues().map((timeVal,index) => {
            return (
                <div 
                    className={(index+1) % 4 === 0 ? 'time-cell-thick' : 'time-cell'}
                    key={index}
                >
                    {timeVal}
                </div>
            )
        })}
    </div>
    )
}

export default TimeCell