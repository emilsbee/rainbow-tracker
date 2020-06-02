// External imports
import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

import moment from 'moment'

// Internal imports 
import MainDashboardTable from '../MainDashboardTable/MainDashboardTable'
import MainDashboardNavBar from '../MainDashboardNavBar/MainDashboardNavBar'
import Footer from '../Footer /Footer'
import NavBar from '../NavBar/NavBar'

const MainDashboard  = () => {
    const notes = useStoreState(state => state.weeks.notes)
    const indexNotes = useStoreState(state => state.weeks.indexNotes)
    const noteIndices = useStoreState(state => state.weeks.noteIndices)

    const getNotes = useStoreActions(actions => actions.weeks.getNotes)
    const startYearListener = useStoreActions(actions => actions.weeks.startYearListener)
    const stopYearListener = useStoreActions(actions => actions.weeks.stopYearListener)

    const stopNoteListeners = useStoreActions(actions => actions.weeks.stopNoteListeners)
    
    const startWeekListener = useStoreActions(actions => actions.weeks.startWeekListener)
    const stopWeekListener = useStoreActions(actions => actions.weeks.stopWeekListener)
    
    const currentWeek = useStoreState(state => state.weeks.currentWeek)
    const years = useStoreState(state => state.weeks.years)
    const weeks = useStoreState(state => state.weeks.yearWeeks)

    const startSettingsListener = useStoreActions(actions => actions.settings.startSettingsListener)
    const stopSettingsListener = useStoreActions(actions => actions.settings.stopSettingsListener)
    
    

    useEffect(() => {
        startWeekListener({type: 'CURRENT_WEEK', init: true})
        
        startSettingsListener()
        return () => {
            
            stopWeekListener({weekid: currentWeek.weekid})
            stopSettingsListener()
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
            <NavBar />
            {currentWeek && <MainDashboardNavBar weekNr={currentWeek.weekNr} year={currentWeek.year} years={years} weeks={weeks} weekid={currentWeek.weekid}/>}
            {currentWeek.days && notes && indexNotes && noteIndices && 
                <MainDashboardTable 
                    days={currentWeek.days} 
                    weekid={currentWeek.weekid}
                    notes={notes}
                    indexNotes={indexNotes}
                    noteIndices={noteIndices}
                />
            }
            {currentWeek.days && notes && indexNotes && noteIndices && 
                <Footer />
            }
            
        </div>
    )
}

export default MainDashboard