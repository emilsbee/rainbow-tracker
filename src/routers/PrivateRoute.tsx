// External imports
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

// Internal imports
import NavBar from "../components/BasicComponents/NavBar/NavBar";
import {useStoreState} from "../store/hookSetup";

/**
 * Private routes require uid to not be an empty string thereby
 * assuming that the user has authenticated. If the user is trying to
 * access a private route while not authenticated, they are redirected
 * back to login screen.
 * @param props The component to render and current path.
 */
const PrivateRoute = (props: {path: string, component: React.FC }) => {
    const uid = useStoreState(state => state.auth.uid)
    const isAuthenticated = !!uid
    const Component = props.component

    return (
        <>
            {uid !== "" && <NavBar />}
            <Route path={props.path} component={() => (
                isAuthenticated ? (
                    <>
                        <Component/>
                    </>
                ) : (
                    <Redirect to="/"/>
                )
            )}>
            </Route>
        </>
    )
}
export default PrivateRoute
