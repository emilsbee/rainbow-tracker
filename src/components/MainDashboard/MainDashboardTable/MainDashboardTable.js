// External imports
import React from 'react'
import { useStoreState } from 'easy-peasy'

// Internal imports
import Day from '../Day/Day/Day'
import {timeValues} from '../../../utils/dataGenerators'
import TimeCell from './TimeCell/TimeCell'
import { createDayArrays, mapDayIndexToDay } from './helpers'
import './MainDashboardTable.scss'
import {ReactComponent as Loader} from "../../../svgIcons/spinner.svg";

function MainDashboardTable({categories, notes}) {

    if (!categories || categories.length === 0 ||!notes || notes.length === 0) {
        return (
            <div id="main-dashboard-table__loading">
                <Loader style={{backgroundColor:'#28292a', height: '6rem', width: '6rem'}}/>
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
