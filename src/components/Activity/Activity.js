// External imports
import React from 'react'
import PropTypes from 'prop-types'

// Internal imports
import './Styles.scss'

const Activity = ({  short, categoryid, loading, onClick }) => {

    if (loading) {
        return (
            <div className="activity-loading"/>
        )
    }

    return (    
        <div 
            className={`activity-container ${categoryid !== "" && 'activity-container-active'}`}
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