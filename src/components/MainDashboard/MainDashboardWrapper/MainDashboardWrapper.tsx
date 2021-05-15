// External imports
import React from 'react'

// Internal imports 
import './MainDashboardWrapper.scss'
import MainDashboardTable from '../MainDashboardTable/MainDashboardTable'
import MainDashboardNavBar from '../MainDashboardNavBar/MainDashboardNavBar'
import {useStoreState, useStoreActions} from "../../../store/hookSetup"
import {getActivitySettings, getCategorySettings} from "../../../store/settings/helpers";
import {getCategoriesByWeekNrAndYear} from "../../../store/categories/helpers";
import {getNotesByWeekNrAndYear} from "../../../store/notes/helpers";
import {createMainDashboardContext} from "./helpers";

const MainDashboardWrapper = () => {
    // Store state
    const uid = useStoreState(state => state.auth.uid)
    const currentDate = useStoreState(state => state.settings.currentDate)
    const categories = useStoreState(state => state.activities.categories)
    const notes = useStoreState(state => state.notes.notes)

    // Store actions
    const setCategories = useStoreActions(actions => actions.activities.setCategories)
    const setNotes = useStoreActions(actions => actions.notes.setNotes)
    const setActivitySettings = useStoreActions(actions => actions.settings.setActivitySettings)
    const setCategorySettings = useStoreActions(actions => actions.settings.setCategorySettings)

    React.useEffect(() => {

        (async function fetchData() {
            try {
                // It is necessary to set these to empty arrays to trigger loading spinner in MainDashboardTable
                setCategories({categories: []})
                setNotes({notes: []})

                await createMainDashboardContext(uid, currentDate.weekNr, currentDate.year)

                const fetchedCategorySettings = await getCategorySettings(uid)
                setCategorySettings({categorySettings: fetchedCategorySettings.val()})

                const fetchedActivitySettings = await getActivitySettings(uid)
                setActivitySettings({activitySettings: fetchedActivitySettings.val()})

                const fetchedCategories = await getCategoriesByWeekNrAndYear(uid, currentDate.weekNr, currentDate.year)
                setCategories({categories: fetchedCategories.val()})

                const fetchedNotes = await getNotesByWeekNrAndYear(uid, currentDate.weekNr, currentDate.year)
                setNotes({notes: fetchedNotes.val()})
            } catch (e) {
                console.error(e)
            }
        })()

    },[currentDate.weekNr, currentDate.year, uid])

    return (
        <div id="main-dash-wrapper">
            
            <MainDashboardNavBar weekNr={parseInt(currentDate.weekNr)} year={parseInt(currentDate.year)}/>

            <MainDashboardTable categories={categories} notes={notes}/>
        </div>
    );
}
 
export default MainDashboardWrapper;