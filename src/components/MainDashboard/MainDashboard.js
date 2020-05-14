// External imports
import React, { useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'


// Internal imports 
import MainDashboardTable from '../MainDashboardTable/MainDashboardTable'
import MainDashboardNavBar from '../MainDashboardNavBar/MainDashboardNavBar'

const MainDashboard  = () => {
    const startYearListener = useStoreActions(actions => actions.weeks.startYearListener)
    const stopYearListener = useStoreActions(actions => actions.weeks.stopYearListener)
    
    const startYearWeekListener = useStoreActions(actions => actions.weeks.startYearWeekListener)
    const stopYearWeekListener = useStoreActions(actions => actions.weeks.stopYearWeekListener)

    const stopNoteListeners = useStoreActions(actions => actions.weeks.stopNoteListeners)
    
    const startWeekListener = useStoreActions(actions => actions.weeks.startWeekListener)
    const stopWeekListener = useStoreActions(actions => actions.weeks.stopWeekListener)
    
    const currentWeek = useStoreState(state => state.weeks.currentWeek)
    const years = useStoreState(state => state.weeks.years)
    const weeks = useStoreState(state => state.weeks.yearWeeks)

    useEffect(() => {
        startWeekListener({type: 'LATEST_WEEK'})
    
        return () => {
            stopWeekListener()
            stopNoteListeners()
        }
    }, [])

    useEffect(() => {
        startYearListener()
        return () => {
            stopYearListener()
        }
    }, [])

    useEffect(() => {
        startYearWeekListener({type:'LATEST_YEAR', year: Math.max(years)})
        return () => {
            stopYearWeekListener()
        }
    }, [])

    return (
        <div>
            {currentWeek && <MainDashboardNavBar weekNr={currentWeek.weekNr} year={currentWeek.year} years={years} weeks={weeks} weekid={currentWeek.weekid}/>}
            {currentWeek.days && <MainDashboardTable days={currentWeek.days} weekid={currentWeek.weekid}/>}
        </div>
    )
}

export default MainDashboard