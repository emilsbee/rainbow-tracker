// External imports
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useStoreActions } from 'easy-peasy'

// Internal imports
import './nav-bar.scss'
import { ReactComponent as LogoutIcon } from './utils/logout.svg'

const NavBar = () => {
    const startLogout = useStoreActions(actions => actions.auth.startLogout)
    // const randomThunk = useStoreActions(actions => actions.weeks.randomThunk)
 


    const beginLogout = () => {
        startLogout()
    }

    return (    
        <div className="nav-bar" >
            <div>
                <NavLink 
                activeClassName="dashboard-link-active"
                    className="dashboard-link" 
                    to="/dashboard"
                >
                    Dashboard
                </NavLink>
                <NavLink
                activeClassName="dashboard-link-active"
                    className="dashboard-link"
                    to="/settings"
                >
                    Settings
                </NavLink>
            </div>
            {/* <button onClick={randomThunk}>Pres</button> */}
            <div id="logout-button-text" onClick={beginLogout}>
                Log out
                <LogoutIcon id="logout-icon"/>
            </div>
        </div>
    )
}

export default NavBar