// External imports
import React from 'react'

// Internal imports 
import './TimeCell.scss'
import {useStoreState} from "../../../../store/hookSetup";

type TimeCellProps = {
    timeValues: () => string[]
}

const TimeCell  = ({ timeValues }: TimeCellProps) => {
    const timeHoverIndex = useStoreState(state => state.settings.timeHoverIndex)
    
    return (
        <div className="time-cell-container" >
        {timeValues().map((timeVal,index) => {
            return (
                <div
                    className="time-cell"
                    key={index}
                    style={{"backgroundColor": timeHoverIndex === index ? '#314149' : "transparent"}}
                >
                    {timeVal}
                </div>
            )
        })}
    </div>
    )
}

export default TimeCell
