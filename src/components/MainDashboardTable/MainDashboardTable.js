// External imports
import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports 
import CategoryItem from '../CategoryItem/CategoryItem'
import {timeValues} from '../../utils/staticData'

const MainDashboardTable  = () => {
    const currentWeek = useStoreState(state => state.weeks.currentWeek)
    const startWeekListener = useStoreActions(actions => actions.weeks.startWeekListener)
    const stopWeekListener = useStoreActions(actions => actions.weeks.stopWeekListener)
    const randomThunk = useStoreActions(actions => actions.weeks.randomThunk)

    useEffect(() => {
        startWeekListener()
        return () => {
            stopWeekListener()
        }
    }, [])
    return (
        <div>
              <table>
                  <thead>
                      <tr>
                          <th></th>
                        {currentWeek && Object.keys(currentWeek.days).map((day) => {
                            return <th key={day}>{day}</th>
                        })}
                      </tr>
                  </thead>
                  <tbody>
                      {currentWeek && Object.keys(currentWeek.days.Friday).map((val, index) => {
                          return (
                            <tr key={index} className="table-row">
                                <td className="table-time">{timeValues()[index]}</td>
                                {Object.keys(currentWeek.days).map((day) => {
                                    return (
                                        <td key={day}>
                                            <CategoryItem weekid={currentWeek.weekid} day={day} index={index} category={currentWeek.days[day][index].category}></CategoryItem>
                                        </td>
                                    )
                                })}
                            </tr>
                          )
                      })}
                  </tbody>
              </table>
              {/* <button onClick={() => randomThunk()}>Press me</button> */}
        </div>
    )
}

export default MainDashboardTable