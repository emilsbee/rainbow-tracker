// External imports
import React, { useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import moment from 'moment'

// Internal imports 
import MainDashboardTable from '../MainDashboardTable/MainDashboardTable'
import MainDashboardNavBar from '../MainDashboardNavBar/MainDashboardNavBar'

const MainDashboard  = () => {
    const startYearListener = useStoreActions(actions => actions.weeks.startYearListener)
    const stopYearListener = useStoreActions(actions => actions.weeks.stopYearListener)

    const stopNoteListeners = useStoreActions(actions => actions.weeks.stopNoteListeners)
    
    const startWeekListener = useStoreActions(actions => actions.weeks.startWeekListener)
    const stopWeekListener = useStoreActions(actions => actions.weeks.stopWeekListener)
    
    const currentWeek = useStoreState(state => state.weeks.currentWeek)
    const years = useStoreState(state => state.weeks.years)
    const weeks = useStoreState(state => state.weeks.yearWeeks)

    const startSettingsListener = useStoreActions(actions => actions.settings.startSettingsListener)

    useEffect(() => {
        startWeekListener({type: 'CURRENT_WEEK'})
        startSettingsListener()
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


    return (
        <div>
            {currentWeek && <MainDashboardNavBar weekNr={currentWeek.weekNr} year={currentWeek.year} years={years} weeks={weeks} weekid={currentWeek.weekid}/>}
            {currentWeek.days && <MainDashboardTable days={currentWeek.days} weekid={currentWeek.weekid}/>}
        </div>
    )
}

export default MainDashboard