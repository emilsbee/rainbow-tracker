// External imports
import React from 'react'
import { useStoreState } from 'easy-peasy'

// Internal imports
import Day from '../Day/Day'
import LoadingPage from '../../LoadingPage/LoadingPage'
import {timeValues} from '../../../utils/staticData'
import TimeCell from '../TimeCell/TimeCell'
import { createDayArrays, mapDayIndexToDay } from './helpers'
import './MainDashboardTable.scss'

function MainDashboardTable() {
    const categories = useStoreState(state => state.activities.categories)

    const notes = useStoreState(state => state.notes.notes)
    

    if (categories.length === 0 || notes.length === 0) {
        return (
            <div id="main-dashboard-table__loading">
                <LoadingPage backgroundColor={'#f6f7f9'}/>
            </div>
        )
    }
    
    return (
        <div id="main-dashboard-table__container">   
            <TimeCell timeValues={timeValues}/>
            {[0,1,2,3,4,5,6].map((day) => {
                return (
                    <Day 
                        key={day} 
                        categories={createDayArrays(categories)[day]} 
                        notes={createDayArrays(notes)[day]} 
                        day={mapDayIndexToDay(day)}
                    />
                )
            })}
        </div>
    );
}

export default MainDashboardTable;
