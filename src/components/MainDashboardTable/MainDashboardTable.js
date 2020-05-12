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
    const startWeekListener = useStoreActions(actions => actions.weeks.startWeekListener)
    const stopWeekListener = useStoreActions(actions => actions.weeks.stopWeekListener)
    const updateWeek = useStoreActions(actions => actions.weeks.updateWeek)

    const [localWeek, setLocalWeek] = useState(false)
    const [dragCategory, setDragCategory] = useState("")
    const [dragActivity, setDragActivity] = useState("")
    const [draggedCategories, setDraggedCategories] = useState([])
    const [dragIndex, setDragIndex] = useState('')
    const [dragHover, setDragHover] = useState('')

    useEffect(() => {
        startWeekListener()
        
        return () => {
            stopWeekListener()
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
              <table style={{"display":"flex", "flexDirection":"column"}}>
                  <thead>
                      <tr>
                          <th></th>
                        {localWeek && Object.keys(localWeek.days).map((day) => {
                            return <th key={day}>{day}</th>
                        })}
                      </tr>
                  </thead>
                  <tbody>
                      {localWeek && Object.keys(localWeek.days.Friday).map((val, index) => {
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
                onClick={() => updateWeek()}>
                    Press me
            </button> */}
        </div>
    )
}

export default MainDashboardTable