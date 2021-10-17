// External imports
import React  from 'react'

// Internal imports
import {useStoreActions, useStoreState} from "../../../store/hookSetup";
import SettingsDashboard from "../SettingsDashboard/SettingsDashboard";

const SettingsDashboardWrapper  = () => {
    // Store tate
    const userid = useStoreState(state => state.auth.uid)
    const categoryTypes = useStoreState(state => state.settings.categoryTypes)
    const activityTypes = useStoreState(state => state.settings.activityTypes)

    // Store actions
    const fetchCategoryTypesFull = useStoreActions(actions => actions.settings.fetchCategoryTypesFull)

    // Local state
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        (async function fetchData() {
            setLoading(true)

            try {
                await fetchCategoryTypesFull({userid})
            } catch (e:any) {
                console.log(e.message)
            } finally {
                setLoading(false)
            }
        })()
    },[])

    return (
        <SettingsDashboard categoryTypes={categoryTypes} activityTypes={activityTypes} loading={loading} setLoading={setLoading}/>
    )
}

export default SettingsDashboardWrapper