// External imports
import React  from 'react'

// Internal imports
import {useStoreActions, useStoreState} from "../../../store/hookSetup";
import SettingsDashboard from "../SettingsDashboard/SettingsDashboard";
import {getActivitySettings, getCategorySettings} from "../../../store/settings/helpers";

const SettingsDashboardWrapper  = () => {
    // Store tate
    const uid = useStoreState(state => state.auth.uid)
    const categorySettings = useStoreState(state => state.settings.categorySettings)
    const activitySettings = useStoreState(state => state.settings.activitySettings)

    // Store actions
    const setCategorySettings = useStoreActions(actions => actions.settings.setCategorySettings)
    const setActivitySettings = useStoreActions(actions => actions.settings.setActivitySettings)

    React.useEffect(() => {
        (async function fetchData() {

            try {
                // Necessary to trigger loading in SettingsDashboard
                // setCategorySettings({categorySettings:null})
                // setActivitySettings({activitySettings:null})

                const fetchedCategorySettings = await getCategorySettings(uid)
                setCategorySettings({categorySettings:fetchedCategorySettings.val()})

                const fetchedActivitySettings = await getActivitySettings(uid)
                setActivitySettings({activitySettings:fetchedActivitySettings.val()})
            } catch (e) {
                console.error(e)
            }
        })()
    },[])

    return (
        <SettingsDashboard categorySettings={categorySettings} activitySettings={activitySettings}/>
    )
}

export default SettingsDashboardWrapper