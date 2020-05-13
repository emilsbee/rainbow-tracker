// External imports
import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports 
import CategoryItem from '../CategoryItem/CategoryItem'
import Note from '../Note/Note'
import {timeValues} from '../../utils/staticData'
import { orderByDays } from '../../utils/ordering'
import './main-dashboard-table.scss'

const MainDashboardTable  = () => {
    const currentWeek = useStoreState(state => state.weeks.currentWeek)
    const notes = useStoreState(state => state.weeks.notes)
    const indexNotes = useStoreState(state => state.weeks.indexNotes)
    const noteIndices = useStoreState(state => state.weeks.noteIndices)
    const startWeekListener = useStoreActions(actions => actions.weeks.startWeekListener)
    const stopWeekListener = useStoreActions(actions => actions.weeks.stopWeekListener)
    const startNoteListeners = useStoreActions(actions => actions.weeks.startNoteListeners)
    const stopNoteListeners = useStoreActions(actions => actions.weeks.stopNoteListeners)
    const randomThunk = useStoreActions(actions => actions.weeks.randomThunk)

    const [localWeek, setLocalWeek] = useState(false)
    const [dragCategory, setDragCategory] = useState("")
    const [dragActivity, setDragActivity] = useState("")
    const [draggedCategories, setDraggedCategories] = useState([])
    const [dragIndex, setDragIndex] = useState('')

    useEffect(() => {
        startNoteListeners()
        startWeekListener()
        return () => {
            stopWeekListener()
            stopNoteListeners()
        }
    }, [startNoteListeners, startWeekListener, stopNoteListeners, stopWeekListener])

    useEffect(() => {
        if(currentWeek) {
            currentWeek["days"] = orderByDays(currentWeek.days)
            setLocalWeek(currentWeek)
            
        } else {
            setLocalWeek(currentWeek)
        }
    }, [currentWeek])
    
    
    return (
        <div className="table-container">
            <table>

                <thead>
                    <tr className="header-row">
                        {localWeek && Object.keys(localWeek.days).map((day) => {
                            return <th key={day}>{day}</th>
                        })}
                    </tr>
                </thead>

                <tbody>
                    {localWeek && notes && indexNotes && noteIndices && 
                        Object.keys(localWeek.days.Friday).map((val, index) => {
                            return (
                                <tr 
                                    className="table-row" 
                                    key={index} 
                                    onMouseEnter={() => setDragIndex(index)} 
                                >
                                    <td 
                                        className="time-cell"  
                                        style={{"backgroundColor": dragIndex === index ? "#D3D3D3" : ''}}
                                    >
                                        {timeValues()[index]}
                                    </td>

                                    {Object.keys(localWeek.days).map((day) => {
                                        return (
                                            <td key={day} className="categ-activ-container">
                                                <CategoryItem 
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
                                                    note={indexNotes[day][index] || indexNotes[day][index] === '' ? notes[day][indexNotes[day][index]] : false}
                                                    noteMultiplier={indexNotes[day][index] ? Object.values(noteIndices[day][indexNotes[day][index]]).length : 1}
                                                >
                                                </CategoryItem>
                                                <Note
                                                
                                                    note={indexNotes[day][index] || indexNotes[day][index] === '' ? notes[day][indexNotes[day][index]] : false}
                                                    noteMultiplier={indexNotes[day][index] ? Object.values(noteIndices[day][indexNotes[day][index]]).length : 1} 
                                                />
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                    })}
                </tbody>
            </table>
              {/* <button 
                onClick={() => randomThunk()}>
                    Press me
            </button> */}
        </div>
    )
}

export default MainDashboardTable