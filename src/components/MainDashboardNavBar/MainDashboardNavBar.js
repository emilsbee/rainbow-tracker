// External imports
import React, { useState, useEffect } from 'react'
import { useStoreActions } from 'easy-peasy'


// Internal imports
import './main-dashboard-nav-bar.scss'
import { ReactComponent as BackArrow } from './utils/back.svg'
import { ReactComponent as NextArrow } from './utils/next.svg'
import WeekDropdown from '../WeekDropdown/WeekDropdown'

const MainDashboardNavBar = ({ weekNr, year, years, weeks, weekid }) => {
    const startWeekListener = useStoreActions(actions => actions.weeks.startWeekListener)
    const startYearWeekListener = useStoreActions(actions => actions.weeks.startYearWeekListener)

    

    const handleYearDropdown = (e) => {
        startWeekListener({type:'LATEST_WEEK', year: e.target.value, weekid})
        startYearWeekListener({year: e.target.value})
    }

    const handleWeekDropdown = (e) => {
        startWeekListener({type:'SPECIFIC_WEEK', year, weekNr: parseInt(e.target.value), weekid})
    }       

    
    return (
        <div className="container">

            <div className="navigation">
                
                <div className="year-dropdown-container">
                    <p className="year-dropdown-label">Go to year</p>
                    
                </div>
                
                
                   <div className="week-dropdown-container">
                        <p className="week-dropdown-label">Go to week</p>
                        <WeekDropdown list={weeks} title={weekNr} right={10}/>
                    </div>
                    
                    
            </div>

            <div className="banners">
                <BackArrow onClick={() => startWeekListener({type: 'PREVIOUS_WEEK', weekNr, year, weekid})} className="previous-week" />
                    <h2 className="year-banner">{year},</h2>
                    <h2 className="week-banner">week {weekNr}</h2>
                <NextArrow onClick={() => startWeekListener({type: 'NEXT_WEEK', weekNr, year, weekid})} className="next-week" />
            </div>
        </div>
    )
}   

export default MainDashboardNavBar