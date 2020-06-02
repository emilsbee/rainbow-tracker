// External imports
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useStoreActions } from 'easy-peasy'

// Internal imports
import './nav-bar.scss'

const NavBar = () => {
    const startLogout = useStoreActions(actions => actions.auth.startLogout)
    const tomMistake = useStoreActions(actions => actions.weeks.tomMistake)
 


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
            <button onClick={tomMistake}>Pres</button>
            <a id="logout-button-text" onClick={beginLogout}>Log out</a>
        </div>
    )
}

export default NavBar