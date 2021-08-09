// External imports
import React  from 'react'

// Internal imports
import {useStoreActions, useStoreState} from "../../../store/hookSetup";
import SettingsDashboard from "../SettingsDashboard/SettingsDashboard";

const SettingsDashboardWrapper  = () => {
    // Store tate
    const categoryTypes = useStoreState(state => state.settings.categoryTypes)
    const activityTypes = useStoreState(state => state.settings.activityTypes)

    // Store actions
    const getCategoryTypesFull = useStoreActions(actions => actions.settings.getCategoryTypesFull)

    React.useEffect(() => {
        (async function fetchData() {
            await getCategoryTypesFull()
        })()
    },[])

    return (
        <SettingsDashboard categoryTypes={categoryTypes} activityTypes={activityTypes}/>
    )
}

export default SettingsDashboardWrapper