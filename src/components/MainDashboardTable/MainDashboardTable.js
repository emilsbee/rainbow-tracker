import React, {useEffect} from 'react'
import Day from '../Day/Day'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { createDayArrays, mapDayIndexToDay } from './helpers'

function MainDashboardTable() {
    const categories = useStoreState(state => state.activities.categories)
    const createCategories = useStoreActions(actions => actions.activities.createCategories)

    const notes = useStoreState(state => state.notes.notes)
    const createNotes = useStoreActions(actions => actions.notes.createNotes)


    useEffect(() => {
        // createNotes()
        // createCategories()
        
    }, [])

    if (categories.length === 0 || notes.length === 0) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    
    return (
        <div 
            style={{
                margin: '100px',
                display: "flex",
                flexDirection: "row",
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
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
