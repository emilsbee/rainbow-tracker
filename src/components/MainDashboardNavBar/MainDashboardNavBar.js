// External imports
import React, { useState, useEffect } from 'react'
import { useStoreActions } from 'easy-peasy'

// Internal imports


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
        <div>
            <button onClick={() => startWeekListener({type: 'PREVIOUS_WEEK', weekNr, year, weekid})}>Previous week</button>
            <button onClick={() => startWeekListener({type: 'NEXT_WEEK', weekNr, year, weekid})}>Next week</button>
            <button onClick={() => newWeek({year})}>New week</button>
            <button onClick={() => newYear()} >New year</button>
            <label>
                Year
                <select onChange={handleYearDropdown} value={year}>
                    {years.map((year) => {
                        return <option key={year} value={year}>{year}</option>
                    })}
                </select>
            </label> 
            
            <label>
                Week
                <select onChange={handleWeekDropdown} value={weekNr}>
                    {weeks.map((week) => {
                        return <option key={week} value={week}>{week}</option>
                    })}
                </select>
            </label>

            <h4>Week: {weekNr}</h4>
            <h4>Year: {year}</h4>
        </div>
    )
}   

export default MainDashboardNavBar