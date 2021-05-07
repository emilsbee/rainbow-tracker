// External imports
import React, { useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { NavLink } from 'react-router-dom'

// Internal imports 
import './settings-dashboard.scss'
import EditCategories from './EditCategories/EditCategories'

const SettingsDashboard  = () => {
    const categorySettings = useStoreState(state => state.settings.categorySettings)
    const activitySettings = useStoreState(state => state.settings.activitySettings)
    
    return (
        
        <div className="settings-dashboard-container">
            {/* 

            {categorySettings && activitySettings && <EditCategories categorySettings={categorySettings} activitySettings={activitySettings}/>}
            
            {categorySettings && activitySettings && <Footer ></Footer>}     */}

            Work in progress.
        </div>
        
        
    )
}

export default SettingsDashboard