// External imports
import React, { useState, useEffect } from 'react'
import { useStoreActions } from 'easy-peasy'


// Internal imports
import './main-dashboard-nav-bar.scss'
import { ReactComponent as BackArrow } from './utils/back.svg'
import { ReactComponent as NextArrow } from './utils/next.svg'
import WeekDropdown from '../WeekDropdown/WeekDropdown'
import YearDropdown from '../YearDropdown/YearDropdown'

const MainDashboardNavBar = ({ weekNr, year, years, weeks, weekid }) => {
    const startWeekListener = useStoreActions(actions => actions.weeks.startWeekListener)
    const startYearWeekListener = useStoreActions(actions => actions.weeks.startYearWeekListener)
    const stopWeekListener = useStoreActions(actions => actions.weeks.stopWeekListener)
    
    
    const handleYearDropdown = (e) => {
            stopWeekListener({weekid})
            startWeekListener({type:'SPECIFIC_WEEK', year: e, weekNr: 1, weekid})
    }

    const handleWeekDropdown = (e) => {
        stopWeekListener({weekid})
        startWeekListener({type:'SPECIFIC_WEEK', year, weekNr: e, weekid})
    }       

    
    const handlePrevWeek = (e) => {
    
        stopWeekListener({weekid})
        startWeekListener({type: 'PREVIOUS_WEEK', weekNr, year, weekid})
    }

    const handleNextWeek = (e) => {
    
        stopWeekListener({weekid})
        startWeekListener({type: 'NEXT_WEEK', weekNr, year, weekid})
    }

    return (
        <div className="container">

            <div className="banners">
                <BackArrow onClick={handlePrevWeek} className="previous-week" />
                    <h2 className="year-banner">{year},</h2>
                    <h2 className="week-banner">week {weekNr}</h2>
                <NextArrow onClick={handleNextWeek} className="next-week" />
            </div>
            <div className="navigation">
                
                <div className="year-dropdown-container">
                    <p className="year-dropdown-label">Go to year</p>
                    <YearDropdown list={years} title={year} onChange={handleYearDropdown}/>
                </div>
                
                
                   <div className="week-dropdown-container">
                        <p className="week-dropdown-label">Go to week</p>
                        <WeekDropdown list={weeks} title={weekNr} onChange={handleWeekDropdown}/>
                    </div>
                    
                    
            </div>

        </div>
    )
}   

export default MainDashboardNavBar