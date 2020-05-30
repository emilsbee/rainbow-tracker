// External imports
import React, { useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'

// Internal imports 
import './settings-dashboard.scss'
import EditCategories from '../EditCategories/EditCategories'
import Footer from '../Footer /Footer'
import NavBar from '../NavBar/NavBar'

const SettingsDashboard  = () => {
    const categorySettings = useStoreState(state => state.settings.categorySettings)
    const activitySettings = useStoreState(state => state.settings.activitySettings)
    const initialiseUserSettings = useStoreActions(actions => actions.settings.initialiseUserSettings)
    
    useEffect(() => {
        initialiseUserSettings()
    }, [])

    return (
        
        <div className="settings-dashboard-container">
            <NavBar />

            {categorySettings && activitySettings && <EditCategories categorySettings={categorySettings} activitySettings={activitySettings}/>}
            
            {categorySettings && activitySettings && <Footer ></Footer>}    
        </div>
        
        
    )
}

export default SettingsDashboard