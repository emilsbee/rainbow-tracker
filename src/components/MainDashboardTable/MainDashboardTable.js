import React from 'react'
import Day from '../Day/Day'
import { useStoreState } from 'easy-peasy'
import { createDayArrays, mapDayIndexToDay } from './helpers'

import LoadingPage from '../LoadingPage/LoadingPage'
import {timeValues} from '../../utils/staticData'
import TimeCell from '../TimeCell/TimeCell'

function MainDashboardTable() {
    const categories = useStoreState(state => state.activities.categories)

    const notes = useStoreState(state => state.notes.notes)


    if (categories.length === 0 || notes.length === 0) {
        return (
            <LoadingPage />
        )
    }
    
    return (
        <div 
            style={{
                margin: '60px',
                display: "flex",
                flexDirection: "row",
                justifyContent: 'center',
                alignItems: 'flex-start'
            }}
        >   
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
