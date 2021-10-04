// External imports
import React  from 'react'

// Internal imports
import {useStoreActions, useStoreState} from "../../../store/hookSetup";
import SettingsDashboard from "../SettingsDashboard/SettingsDashboard";
import {getCategoryTypesFull} from "../../../dao/settingsDao";
import {ActivityType, CategoryType} from "../../../store/settings/settings";

const SettingsDashboardWrapper  = () => {
    // Store tate
    const uid = useStoreState(state => state.auth.uid)
    const categoryTypes = useStoreState(state => state.settings.categoryTypes)
    const activityTypes = useStoreState(state => state.settings.activityTypes)

    // Store actions
    const setCategoryTypes = useStoreActions(actions => actions.settings.setCategoryTypes)
    const setActivityTypes = useStoreActions(actions => actions.settings.setActivityTypes)

    // Local state
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        (async function fetchData() {
            setLoading(true)

            let categoryTypesFull: {activityTypes: ActivityType[], categoryTypes: CategoryType[]} = await getCategoryTypesFull(uid)
            setCategoryTypes({categoryTypes: categoryTypesFull.categoryTypes})
            setActivityTypes({activityTypes: categoryTypesFull.activityTypes})

            setLoading(false)
        })()
    },[])

    return (
        <SettingsDashboard categoryTypes={categoryTypes} activityTypes={activityTypes} loading={loading} setLoading={setLoading}/>
    )
}

export default SettingsDashboardWrapper