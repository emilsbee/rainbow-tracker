// External imports
import React from 'react'
import PropTypes from 'prop-types'

// Internal imports
import './Activity.scss'

const Activity = ({  short, categoryid, onClick, block }) => {

    return (    
        <div 
            // Block checks if a category has activities.
            // If it doesn't the activity shouldn't highlight on hover
            // and user shouldn't be able to click on activity to get activity popover
            className={`activity-container ${categoryid !== ""  && block && 'activity-container-active'}`}
            onClick={(e) => {
                if (categoryid !== "") {
                    onClick()
                }
            }}
        >
            {short}
        </div>
    )
}

Activity.propTypes = {
    short: PropTypes.string.isRequired,
    categoryid: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    block: PropTypes.bool.isRequired
};

export default Activity