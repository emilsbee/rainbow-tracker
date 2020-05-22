// External imports
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useStoreActions } from 'easy-peasy'

// Internal imports
import './nav-bar.scss'

const NavBar = () => {
    const startLogout = useStoreActions(actions => actions.auth.startLogout)
   
 


    const beginLogout = () => {
        startLogout()
    }

    return (    
        <div className="nav-bar" >
            <div>
                <NavLink 
                    className="dashboard-link" 
                    to="/dashboard"
                >
                    Dashboard
                </NavLink>
                <NavLink
                    className="dashboard-link"
                    to="/dashboard"
                >
                    Settings
                </NavLink>
            </div>
            
            <a id="logout-button-text" onClick={beginLogout}>Log out</a>
        </div>
    )
}

export default NavBar