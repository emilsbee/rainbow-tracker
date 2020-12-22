// External imports
import React, { useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { NavLink } from 'react-router-dom'

// Internal imports 
import './settings-dashboard.scss'
import EditCategories from './EditCategories/EditCategories'
import Footer from '../Footer/Footer'

const SettingsDashboard  = () => {
    const categorySettings = useStoreState(state => state.settings.categorySettings)
    const activitySettings = useStoreState(state => state.settings.activitySettings)
    
    return (
        
        <div 
            // className="settings-dashboard-container"
            style={{
                width: '100%',
                height: '100%',
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignContent: "space-between",
            }}
        >
            {/* 

            {categorySettings && activitySettings && <EditCategories categorySettings={categorySettings} activitySettings={activitySettings}/>}
            
            {categorySettings && activitySettings && <Footer ></Footer>}     */}

            Under maintenance :(

                <NavLink 
                    to="/dashboard"
                >
                    Go back
                </NavLink>
                <Footer />
        </div>
        
        
    )
}

export default SettingsDashboard