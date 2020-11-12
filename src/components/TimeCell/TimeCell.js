// External imports
import React from 'react'
import { useStoreState } from 'easy-peasy'

// Internal imports 
import './time-cell.scss'

const TimeCell  = ({ timeValues }) => {
    
    const timeHoverIndex = useStoreState(state => state.settings.timeHoverIndex)
    
    return (
        <div className="time-cell-container" >
        {timeValues().map((timeVal,index) => {
            return (
                <div 
                    className={(index+1) % 4 === 0 ? 'time-cell-thick' : 'time-cell'}
                    key={index}
                    style={{"backgroundColor": timeHoverIndex === index && '#e1e1d0'}}
                >
                    {timeVal}
                    
              
                </div>
            )
        })}
    </div>
    )
}

function areEqual (prevProps, nextProps) {
    return true
}

export default React.memo(TimeCell, areEqual)
