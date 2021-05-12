// External imports
import React from 'react'
import { useStoreState } from 'easy-peasy'
import PropTypes from 'prop-types'

// Internal imports 
import './TimeCell.scss'

const TimeCell  = ({ timeValues }) => {
    const timeHoverIndex = useStoreState(state => state.settings.timeHoverIndex)
    
    return (
        <div className="time-cell-container" >
        {timeValues().map((timeVal,index) => {
            return (
                <div
                    className="time-cell"
                    key={index}
                    style={{"backgroundColor": timeHoverIndex === index && '#314149'}}
                >
                    {timeVal}
                </div>
            )
        })}
    </div>
    )
}

TimeCell.propTypes = {
    timeValues: PropTypes.func.isRequired
}

export default TimeCell
