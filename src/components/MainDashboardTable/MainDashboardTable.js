import React, {useEffect} from 'react'
import Day from '../Day/Day'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { createDayArrays, mapDayIndexToDay } from './helpers'

function MainDashboardTable() {
    const activities = useStoreState(state => state.activities.activities)
    const notes = useStoreState(state => state.notes.notes)
    const createNotes = useStoreActions(actions => actions.notes.createNotes)

    useEffect(() => {
        createNotes()
    }, [])

    if (notes.length === 0) {
        return(
            <div>
                Loading
            </div>
        )
    }

    return (
        <div 
            style={{
                margin: '100px',
                display: "flex",
                flexDirection: "row"
            }}
        >
            {[0,1,2,3,4,5,6].map((day) => {
                return (
                    <Day 
                        key={day} 
                        activities={createDayArrays(activities)[day]} 
                        notes={createDayArrays(notes)[day]} 
                        day={mapDayIndexToDay(day)}
                    />
                )
            })}
        </div>
    );
}

export default MainDashboardTable;
