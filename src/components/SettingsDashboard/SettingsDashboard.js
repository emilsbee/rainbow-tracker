// External imports
import React, { useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'

// Internal imports 
import './settings-dashboard.scss'
import EditCategories from '../EditCategories/EditCategories'

const SettingsDashboard  = () => {
    const categorySettings = useStoreState(state => state.settings.categorySettings)
    const activitySettings = useStoreState(state => state.settings.activitySettings)
    const initialiseUserSettings = useStoreActions(actions => actions.settings.initialiseUserSettings)
    
    useEffect(() => {
        initialiseUserSettings()
    }, [])

    return (
        <div className="settings-dashboard-container">
            <div className="settings-dashboard-title">
                Settings
            </div>
            {categorySettings && activitySettings && <EditCategories categorySettings={categorySettings} activitySettings={activitySettings}/>}
        </div>
    )
}

export default SettingsDashboard