// External imports
import React from 'react'
import PropTypes from 'prop-types'

// Internal imports
import './Styles.scss'

const Activity = ({  short, categoryid, activityid, loading, onClick }) => {

    if (loading) {
        return (
            <div className="activity-loading"/>
        )
    }

    return (    
        <div 
            className={`activity-container ${activityid && 'activity-container-active'}`}
            onClick={() => activityid && console.log('click')}
        >
            {short}
        </div>
    )
}

Activity.propTypes = {
    short: PropTypes.string,
    categoryid: PropTypes.string,
    activityid: PropTypes.string,
    loading: PropTypes.bool,
    onClick: PropTypes.func
};

export default Activity