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
import { ReactComponent as MenuIcon } from "../../svgIcons/list.svg";

/**
 * The navigation bar on the left side of page.
 */
const NavBar = () => {
    // Local state
    const [currentLocation, setCurrentLocation] = React.useState("/dashboard")
    const [hovering, setHovering] = React.useState("")
    const [open, setOpen] = React.useState(false)

    // Store actions
    const startLogout = useStoreActions(actions => actions.auth.startLogout)
    const reset = useStoreActions(actions => actions.reset)

    // Every time the location changes, currentLocation is updated.
    let location = useLocation()
    React.useEffect(() => {
        setCurrentLocation(location.pathname)
    }, [location])

    /**
     * Handles logout button press
     */
    const beginLogout = () => {
        reset()
        startLogout()
    }

    return (
        <div>
            { open && <div id="nav-bar">
                <div id="nav-bar-inner-container">
                    <NavLink to="/dashboard"
                         onMouseOver={() => setHovering('/dashboard')}
                         onMouseLeave={() => setHovering("")}
                    >
                        <DashboardIcon
                            id="nav-bar-link-icon"
                            style={{
                                fill: currentLocation === '/dashboard' ? "#c48852" : hovering === '/dashboard' ? "#c48852" : "white",
                                marginTop: 20,
                            }}
                        />
                    </NavLink>

                    <NavLink to="/analytics"
                             onMouseEnter={() => setHovering('/analytics')}
                             onMouseLeave={() => setHovering("")}
                    >
                        <AnalyticsIcon
                            id="nav-bar-link-icon"
                            style={{
                                fill: currentLocation === '/analytics' ? "#c48852" : hovering === '/analytics' ? "#c48852" : "white"
                            }}
                        />
                    </NavLink>

                    <NavLink to="/settings"
                             onMouseEnter={() => setHovering('/settings')}
                             onMouseLeave={() => setHovering("")}
                    >
                        <SettingsIcon
                            id="nav-bar-link-icon"
                            style={{
                                fill: currentLocation === '/settings' ? "#c48852" : hovering === '/settings' ? "#c48852" : "white"
                            }}
                        />
                    </NavLink>
                </div>

                <div onClick={beginLogout}>
                    <LogoutIcon id="nav-bar-logout-icon" height={50} width={50}/>
                </div>
            </div>}
            <div id="nav-bar-closed-container">
                <MenuIcon id="nav-bar-toggle-icon" onClick={() => setOpen(!open)} style={{marginLeft: open ? 80 : 20}}/>
            </div>
        </div>

    )
}

export default NavBar