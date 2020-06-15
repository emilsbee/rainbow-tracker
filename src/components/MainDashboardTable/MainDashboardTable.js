// External imports
import React, { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'

// Internal imports 
import Day from '../Day/Day'
import TimeCell from '../TimeCell/TimeCell'
import {timeValues, weekDays} from '../../utils/staticData'
import { orderByDays } from '../../utils/ordering'
import './main-dashboard-table.scss'



const MainDashboardTable = ({ days, weekid }) => {
    
    
    const updateFirebaseNotes = useStoreActions(actions => actions.weeks.updateFirebaseNotes)
    const notes = useStoreState(state => state.weeks.notes)
    const indexNotes = useStoreState(state => state.weeks.indexNotes)
    const noteIndices = useStoreState(state => state.weeks.noteIndices)

    // Category/activtiy items
    const [localWeek, setLocalWeek] = useState(false)
   
    // Notes
    const [localNotes, setLocalNotes] = useState(false)
    const [localIndexNotes, setLocalIndexNotes] = useState(false)
    const [localNoteIndices, setLocalNoteIndices] = useState(false)
    
    
    useEffect(() => {
        var currentWeek = {}
            currentWeek["days"] = orderByDays(days)
            currentWeek["weekid"] = weekid
            setLocalWeek(currentWeek)
    }, [days])

    
    
    useEffect(() => {
        
        setLocalNotes(notes)
        setLocalNoteIndices(noteIndices)
        setLocalIndexNotes(indexNotes)
    }, [noteIndices, notes, indexNotes])
 
    const handleUpdateFirebaseNotes = () => {
        updateFirebaseNotes({
            notes,
            noteIndices
        })
    }


    return (
        <div className="table-container">
            <TimeCell timeValues={timeValues}/>
           {localWeek && localNoteIndices && localNotes && localIndexNotes && weekDays.map((day) => {
               
               
               return (
                   <div key={day} className="day-container">
                       <div className="day-header">
                           {day}
                       </div>
                   <Day 
                        weekid={weekid}
                        day={day}
                        categories={localWeek.days[day]}
                        notes={localNotes[day]}
                        noteIndices={localNoteIndices[day]}
                        indexNotes={localIndexNotes[day]}
                        updateFirebaseNotes={handleUpdateFirebaseNotes}
                   />
                   </div>
               )
           })}
        </div>
    )
}

function areEqual (prevProps, nextProps) {
    if (
      prevProps.weekid === nextProps.weekid &&
      JSON.stringify(prevProps.days) === JSON.stringify(nextProps.days) &&
      JSON.stringify(prevProps.indexNotes) === JSON.stringify(nextProps.indexNotes) &&
      JSON.stringify(prevProps.noteIndices) === JSON.stringify(nextProps.noteIndices) &&
      JSON.stringify(prevProps.notes) === JSON.stringify(nextProps.notes) 
    ) {
      return true
    } else {
      return false
    }
    
  }

export default React.memo(MainDashboardTable, areEqual)

// export default MainDashboardTable





