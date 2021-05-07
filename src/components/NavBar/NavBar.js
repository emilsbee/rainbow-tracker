// External imports
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useStoreActions } from 'easy-peasy'

// Internal imports
import './nav-bar.scss'
import { ReactComponent as LogoutIcon } from '../../svgIcons/logout.svg'
import { ReactComponent as DashboardIcon } from "../../svgIcons/dashboard.svg";
import { ReactComponent as SettingsIcon } from "../../svgIcons/settings.svg";
import { ReactComponent as AnalyticsIcon } from "../../svgIcons/analytics.svg";

const NavBar = () => {
    // Local state
    const [currentLocation, setCurrentLocation] = React.useState("/dashboard")
    const [hovering, setHovering] = React.useState("")

    // Store actions
    const startLogout = useStoreActions(actions => actions.auth.startLogout)

    let location = useLocation()
    React.useEffect(() => {
        setCurrentLocation(location.pathname)
    }, [location])

    const beginLogout = () => {
        startLogout()
    }

    return (    
        <div id="nav-bar">
            <div id="nav-bar-inner-container">
                <NavLink to="/dashboard" onMouseEnter={() => setHovering('/dashboard')} onMouseLeave={() => setHovering("")}>
                    <DashboardIcon
                            id="nav-bar-link-icon"
                            style={{
                                fill: currentLocation === '/dashboard' ? "rgb(253,190,64)" : hovering === '/dashboard' ? "rgb(253,190,64)" : "white",
                                marginTop:20
                            }}
                    />
                </NavLink>

                <NavLink to="/analytics" onMouseEnter={() => setHovering('/analytics')} onMouseLeave={() => setHovering("")}>
                    <AnalyticsIcon
                        id="nav-bar-link-icon"
                        style={{
                            fill: currentLocation === '/analytics' ? "rgb(253,190,64)" : hovering === '/analytics' ? "rgb(253,190,64)" : "white"
                        }}
                    />
                </NavLink>

                <NavLink to="/settings" onMouseEnter={() => setHovering('/settings')} onMouseLeave={() => setHovering("")}>
                    <SettingsIcon
                        id="nav-bar-link-icon"
                        style={{
                            fill: currentLocation === '/settings' ? "rgb(253,190,64)" : hovering === '/settings' ? "rgb(253,190,64)" : "white"
                        }}
                    />
                </NavLink>
            </div>

            <div onClick={beginLogout}>
                <LogoutIcon id="nav-bar-logout-icon" height={50} width={50}/>
            </div>
        </div>
    )
}

export default NavBar