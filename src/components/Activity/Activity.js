// External imports
import React from 'react'
import PropTypes from 'prop-types'

// Internal imports
import './Styles.scss'

const Activity = ({  short, categoryid, onClick, block }) => {
    

    return (    
        <div 
            // Block checks if a category has activities.
            // If it doesn't the activity shouldn't highlight on hover
            // and user should'nt be able to click on activity to get activity popover
            className={`activity-container ${categoryid !== ""  && block && 'activity-container-active'}`}
            onClick={(e) => {
                if (categoryid !== "") {
                    onClick(e)
                }
            }}
        >
            {short}
        </div>
    )
}

Activity.propTypes = {
    short: PropTypes.string,
    categoryid: PropTypes.string,
    loading: PropTypes.bool,
    onClick: PropTypes.func
};

export default Activity