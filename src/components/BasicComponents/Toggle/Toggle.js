// External imports
import React from 'react';
import PropTypes from 'prop-types'

// Internal imports
import './Toggle.scss'

const Toggle = ({ values, activeValue, setActiveValue }) => {

    return (
        <div id="toggle-container">
            {values.map((value, index) => {

                return (
                    <div
                        key={index}
                        onClick={() => setActiveValue(value)}
                        id={value === activeValue ? "toggle-active" : "toggle-inactive"}
                    >
                        {value}
                    </div>
                )
            })}
        </div>
    );
}

Toggle.propTypes = {
    values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool])),
    activeValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
    setActiveValue: PropTypes.func
}
 
export default Toggle;