// External imports
import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports 
import CategoryItem from '../CategoryItem/CategoryItem'
import ActivityItem from '../ActivityItem/ActivityItem'
import {timeValues} from '../../utils/staticData'
import { orderByDays } from '../../utils/ordering'

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
    const [dragHover, setDragHover] = useState('')

    useEffect(() => {
        startNoteListeners()
        startWeekListener()
        return () => {
            stopWeekListener()
            stopNoteListeners()
        }
    }, [])

    useEffect(() => {
        if(currentWeek) {
            currentWeek["days"] = orderByDays(currentWeek.days)
            setLocalWeek(currentWeek)
            
        } else {
            setLocalWeek(currentWeek)
        }
    }, [currentWeek])
    
    
    return (
        <div style={{"display":"flex", "flexDirection":"row", "justifyContent":"center"}}>
              <table style={{"display":"flex", "flexDirection":"column", "width":"1160px"}}>
                  <thead>
                      <tr style={{"display":"flex", "justifyContent":"space-evenly"}}>
                        {localWeek && Object.keys(localWeek.days).map((day) => {
                            return <th key={day}>{day}</th>
                        })}
                      </tr>
                  </thead>
                  <tbody>
                  
                      {localWeek && notes && indexNotes && noteIndices && Object.keys(localWeek.days.Friday).map((val, index) => {
                          return (
                            <tr key={index} className="table-row" onMouseEnter={() => setDragIndex(index)} style={{"display":"flex"}}>
                                <td className="table-time"  style={{"backgroundColor": dragIndex === index ? "#D3D3D3" : '', "width":"38px"}}>{timeValues()[index]}</td>
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