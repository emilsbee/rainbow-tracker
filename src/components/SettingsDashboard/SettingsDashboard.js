// External imports
import React, { useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { NavLink } from 'react-router-dom'

// Internal imports 
import './settings-dashboard.scss'
import EditCategories from './EditCategories/EditCategories'
import Footer from '../Footer /Footer'
import NavBar from '../NavBar/NavBar'

const SettingsDashboard  = () => {
    const categorySettings = useStoreState(state => state.settings.categorySettings)
    const activitySettings = useStoreState(state => state.settings.activitySettings)
    
    return (
        
        <div 
            // className="settings-dashboard-container"
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
                margin: "100px"
            }}
        >
            {/* <NavBar />

            {categorySettings && activitySettings && <EditCategories categorySettings={categorySettings} activitySettings={activitySettings}/>}
            
            {categorySettings && activitySettings && <Footer ></Footer>}     */}

            Under maintenance :(

                <NavLink 
                    to="/dashboard"
                >
                    Go back
                </NavLink>
        </div>
        
        
    )
}

export default SettingsDashboard