// External imports
import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports 
import CategoryItem from '../CategoryItem/CategoryItem'
import Note from '../Note/Note'
import TimeCell from '../TimeCell/TimeCell'
import {timeValues} from '../../utils/staticData'
import { orderByDays } from '../../utils/ordering'
import './main-dashboard-table.scss'

const MainDashboardTable = ({ days, weekid,notes, indexNotes, noteIndices }) => {
    
    const randomThunk = useStoreActions(actions => actions.weeks.randomThunk)
    const updateWeek = useStoreActions(actions => actions.weeks.updateWeek)

    // Category/activtiy items
    const [localWeek, setLocalWeek] = useState(false)
    const [dragCategory, setDragCategory] = useState("")
    const [dragActivity, setDragActivity] = useState("")
    const [draggedCategories, setDraggedCategories] = useState([])
    const [dragIndex, setDragIndex] = useState('')

    // Notes
    
    const [localNotes, setLocalNotes] = useState(false)
    
    const [dragNoteObj, setDragNoteObj] = useState(false) 
    const [localNoteIndices, setLocalNoteIndices] = useState(false)
    
    
    

    useEffect(() => {
        var currentWeek = {}
            currentWeek["days"] = orderByDays(days)
            currentWeek["weekid"] = weekid
            setLocalWeek(currentWeek)
    }, [days])


    
    useEffect(() => {
        setLocalNotes(notes)
    }, [notes])

    useEffect(() => {
        
        setLocalNoteIndices(noteIndices)
    }, [noteIndices])

    const handleSetDragNoteObj = (data) => { 
        setDragNoteObj(data)
    }
    
    const handleSetLocalNoteIndices = (data) => {
        setLocalNoteIndices(data)
    }   


  
    
    return (
        <div className="table-container">
            <TimeCell timeValues={timeValues}/>
           {localWeek && noteIndices && Object.keys(localWeek.days).map((day) => {
               var formatDay = localWeek.days[day]
            
               return (
                   <div className="day-container" key={day}>
                       <div className="day-header">
                            {day}
                       </div>
                        {localNotes && localNoteIndices && formatDay.map((period, index) => {
                            var noteid = indexNotes[day][index]
                            var noteText = localNotes[day][noteid]
                            var noteExtension = localNoteIndices[day][noteid]
                            
                            var isFirst;
                            var nrNoteArray = [] 
                            for (var i = 0; i < Object.keys(noteExtension).length; i++) nrNoteArray.push(parseInt(Object.keys(noteExtension)[i]))
                            
                            if (Math.min(...Object.keys(noteExtension)) === index) {
                                    isFirst = true
                            } else {
                                    isFirst = false      
                            }
                            
                            return (
                                <div key={index} className="category-note-container">
                                <CategoryItem 
                                    className="category-cell"
                                    weekid={localWeek.weekid} 
                                    day={day} 
                                    index={index} 
                                    category={localWeek.days[day][index].category}
                                    activity={localWeek.days[day][index].activity}
                                    setDragCategory={setDragCategory}
                                    dragCategory={dragCategory}
                                    dragActivity={dragActivity}
                                    setDragActivity={setDragActivity}
                                    localWeek={localWeek}
                                    draggedCategories={draggedCategories}
                                    setDraggedCategories={setDraggedCategories}
                                    setDragIndex={setDragIndex}
                                >
                                </CategoryItem>
                                {isFirst && <Note 
                                    setDragNoteObj={handleSetDragNoteObj}
                                    dragNoteObj={dragNoteObj}
                                    index={index}
                                    note={noteText} 
                                    noteid={noteid}
                                    day={day}
                                    weekid={weekid}
                                    indices={Object.keys(noteExtension)} 
                                    noteIndices={noteIndices}
                                    setLocalNoteIndices={handleSetLocalNoteIndices}
                                    localNotes={localNotes}
                                    setLocalNotes={setLocalNotes}
                                    indexNotes={indexNotes}
                                />}
                                </div>
                            )
                        })}
                    </div>
               )
           })}
        </div>
    )
}

// function areEqual (prevProps, nextProps) {
//     if (
//       prevProps.weekid === nextProps.weekid &&
//       JSON.stringify(prevProps.days) === JSON.stringify(nextProps.days) &&
//       JSON.stringify(prevProps.indexNotes) === JSON.stringify(nextProps.indexNotes) &&
//       JSON.stringify(prevProps.noteIndices) === JSON.stringify(nextProps.noteIndices) &&
//       JSON.stringify(prevProps.notes) === JSON.stringify(nextProps.notes) &&
//       JSON.stringify(prevProps.dragNoteObj) === JSON.stringify(nextProps.dragNoteObj) &&
//       JSON.stringify(prevProps.localNoteIndices) === JSON.stringify(nextProps.localNoteIndices) 
//     ) {
//       return true
//     } else {
//       return false
//     }
    
//   }

// export default React.memo(MainDashboardTable, areEqual)


export default MainDashboardTable


