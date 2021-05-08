// External imports
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useStoreState } from 'easy-peasy'

// Internal imports
import NavBar from "../components/NavBar/NavBar";

/**
 * Private routes require uid to not be an empty string thereby
 * assuming that the user has authenticated. If the user is trying to
 * access a private route while not authenticated, they are redirected
 * back to login screen.
 * @param props The component to render and current path.
 */
const PrivateRoute = (props) => {
    const uid = useStoreState(state => state.auth.uid)
    const isAuthenticated = !!uid
    const Component = props.component

    return (
        <div>
            {uid !== "" && <NavBar />}
            <Route path={props.path} component={(props) => (
                isAuthenticated ? (
                    <div>
                        <Component {...props}/>

                    </div>
                ) : (
                    <Redirect to="/"/>
                )
            )}>
            </Route>
        </div>
    )
}
export default PrivateRoute
