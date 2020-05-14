// External imports
import React from 'react'
import { Link } from 'react-router-dom'
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
            <Link className="navigation-link" to="/dashboard">Dashboard</Link>
            
            
            <a><button 
            onClick={beginLogout}
            className="logout-button"
            >
            Log out
            </button>
            </a>
        </div>
    )
}

export default NavBar