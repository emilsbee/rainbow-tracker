// External imports
import React from 'react'

// Internal imports
import Day from '../Day/Day/Day'
import {timeValues} from '../../../utils/dataGenerators'
import TimeCell from './TimeCell/TimeCell'
import './MainDashboardTable.scss'
import {ReactComponent as Loader} from "../../../svgIcons/spinner.svg";
import {Category} from "../../../store/categories/categories";
import {Note} from "../../../store/notes/notes";
import {useStoreState} from "../../../store/hookSetup";

type MainDashboardTableProps = {
    categories:Category[][],
    notes:Note[][]
}

function MainDashboardTable({categories, notes}:MainDashboardTableProps) {
    // Store state
    const activityTypes = useStoreState(state => state.settings.activityTypes)
    const categoryTypes = useStoreState(state => state.settings.categoryTypes)

    if (categories.length === 0 || notes.length === 0 || !activityTypes || !categoryTypes) {
        return (
            <div id="main-dashboard-table__loading">
                <Loader style={{height: '6rem', width: '6rem'}}/>
            </div>
        )
    }

    return (
        <div id="main-dashboard-table__container">   
            
            <TimeCell timeValues={timeValues}/>

            {categories.map((dayArr, dayIndex) => {
                return (
                    <Day
                        key={dayArr[0].weekDay}
                        categories={dayArr}
                        notes={notes[dayIndex]}
                        weekDay={dayIndex}
                    />
                )
            })}
        </div>
    );
}

export default MainDashboardTable;
