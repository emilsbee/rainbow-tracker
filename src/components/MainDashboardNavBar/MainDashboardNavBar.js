// External imports
import React from 'react'


// Internal imports
import './Styles.scss'


const MainDashboardNavBar = ({ weekNr, year}) => {

    return (
        <div id="dashboard-nav-container">
            <h2 id="dashboard-nav-year-banner">{year},</h2>
            <h2 id="dashboard-nav-week-banner">week {weekNr}</h2>
        </div>
    )
}   

export default MainDashboardNavBar