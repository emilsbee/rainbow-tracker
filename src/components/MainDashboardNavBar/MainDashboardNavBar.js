// External imports
import React, { useState, useEffect } from 'react'
import { useStoreActions } from 'easy-peasy'

// Internal imports
import './main-dashboard-nav-bar.scss'

const MainDashboardNavBar = ({ weekNr, year, years, weeks, weekid }) => {
    const startWeekListener = useStoreActions(actions => actions.weeks.startWeekListener)
    const startYearWeekListener = useStoreActions(actions => actions.weeks.startYearWeekListener)
    const newWeek = useStoreActions(actions => actions.weeks.newWeek)
    const newYear = useStoreActions(actions => actions.weeks.newYear)
    

    const handleYearDropdown = (e) => {
        startWeekListener({type:'LATEST_WEEK', year: e.target.value, weekid})
        startYearWeekListener({year: e.target.value})
    }

    const handleWeekDropdown = (e) => {
        startWeekListener({type:'SPECIFIC_WEEK', year, weekNr: parseInt(e.target.value), weekid})
    }       

    
    return (
        <div className="container">
            
            <div className="new-buttons">
                <button onClick={() => newWeek({year})} className="new-year">New week</button>
                <button onClick={() => newYear()} className="new-week">New year</button>
            </div>

            <div className="banners">
                <h2 className="week-banner">Week: {weekNr}</h2>
                <h2 className="year-banner">Year: {year}</h2>
            </div>

            <div className="navigation">
                <label>
                    Year
                    <select onChange={handleYearDropdown} value={year} className="year-dropdown">
                        {years.map((year) => {
                            return <option key={year} value={year}>{year}</option>
                        })}
                    </select>
                </label> 
                
                <label>
                    Week
                    <select onChange={handleWeekDropdown} value={weekNr} className="week-dropdown">
                        {weeks.map((week) => {
                            return <option key={week} value={week}>{week}</option>
                        })}
                    </select>
                </label>
                <button onClick={() => startWeekListener({type: 'PREVIOUS_WEEK', weekNr, year, weekid})} className="previous-week">Previous week</button>
                <button onClick={() => startWeekListener({type: 'NEXT_WEEK', weekNr, year, weekid})} className="next-week">Next week</button>
            </div>
        </div>
    )
}   

export default MainDashboardNavBar