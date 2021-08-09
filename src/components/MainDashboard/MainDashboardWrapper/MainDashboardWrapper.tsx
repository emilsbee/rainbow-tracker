// External imports
import React from 'react'

// Internal imports 
import './MainDashboardWrapper.scss'
import MainDashboardTable from '../MainDashboardTable/MainDashboardTable'
import MainDashboardNavBar from '../MainDashboardNavBar/MainDashboardNavBar'
import {useStoreState, useStoreActions} from "../../../store/hookSetup"
import {Category} from "../../../store/categories/categories";
import {Note} from "../../../store/notes/notes";

const MainDashboardWrapper = () => {
    // Store state
    const uid = useStoreState(state => state.auth.uid)
    const currentDate = useStoreState(state => state.settings.currentDate)
    const categories: Category[][] = useStoreState(state => state.categories.categories)
    const notes: Note[][] = useStoreState(state => state.notes.notes)

    // Store actions
    const setCategories = useStoreActions(actions => actions.categories.setCategories)
    const setNotes = useStoreActions(actions => actions.notes.setNotes)
    const getWeek = useStoreActions(actions => actions.weeks.getWeek)
    const getCategoryTypesFull = useStoreActions(actions => actions.settings.getCategoryTypesFull)

    React.useEffect(() => {
        (async function fetchData() {
            // It is necessary to set these to empty arrays to trigger loading spinner in MainDashboardTable
            setCategories({categories: []})
            setNotes({notes: []})

            // Either fetches week right away or if it doesnt exist, it is created. Either way it will be set in store categories.
            await getWeek({weekNr: currentDate.weekNr, year: currentDate.year})

            // Fetch category and activity types
            await getCategoryTypesFull()
        })()

    },[currentDate.weekNr, currentDate.year, uid])

    return (
        <div id="main-dash-wrapper">
            
            <MainDashboardNavBar weekNr={currentDate.weekNr} year={currentDate.year}/>

            <MainDashboardTable categories={categories} notes={notes}/>
        </div>
    );
}
 
export default MainDashboardWrapper;