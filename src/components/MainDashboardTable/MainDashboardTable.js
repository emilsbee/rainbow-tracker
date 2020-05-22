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

const MainDashboardTable  = ({ days, weekid }) => {

    const notes = useStoreState(state => state.weeks.notes)
    const indexNotes = useStoreState(state => state.weeks.indexNotes)
    const noteIndices = useStoreState(state => state.weeks.noteIndices)
    // const startNoteListeners = useStoreActions(actions => actions.weeks.startNoteListeners)
    const randomThunk = useStoreActions(actions => actions.weeks.randomThunk)

    const [localWeek, setLocalWeek] = useState(false)
    const [dragCategory, setDragCategory] = useState("")
    const [dragActivity, setDragActivity] = useState("")
    const [draggedCategories, setDraggedCategories] = useState([])
    const [dragIndex, setDragIndex] = useState('')


    useEffect(() => {
        var currentWeek = {}
            currentWeek["days"] = orderByDays(days)
            currentWeek["weekid"] = weekid
            setLocalWeek(currentWeek)
    }, [days])

    
    return (
        <div className="table-container">
            <TimeCell timeValues={timeValues}/>
           {localWeek && Object.keys(localWeek.days).map((day) => {
               var formatDay = localWeek.days[day]
            
               return (
                   <div className="day-container" key={day}>
                       <div className="day-header">
                            {day}
                       </div>
                        {formatDay.map((period, index) => {
                            return (
                                <CategoryItem 
                                    className="category-cell"
                                    key={index}
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
                            )
                        })}
                    </div>
               )
           })}
        </div>
    )
}

export default MainDashboardTable





