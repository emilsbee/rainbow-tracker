// External imports
import React from 'react'
import { createBrowserHistory } from 'history'
import {Router, Route, Switch} from 'react-router-dom'

// Internal imports
import MainDashboardWrapper from '../components/MainDashboard/MainDashboardWrapper'
import LoginPage from '../components/LoginPage/LoginPage'
import NotFound from '../components/NotFound/NotFound'
import SettingsDashboardWrapper from '../components/SettingsDashboard/SettingsDashboardWrapper/SettingsDashboardWrapper'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import BackendError from "../components/BackendError/BackendError";


export const history = createBrowserHistory()

/**
 * This component defines private and public routes.
 */
const AppRouter = () => {

    return (
        <Router history={history}>
                <Switch>
                        <PublicRoute path="/" component={LoginPage} exact={true}/>
                        <PrivateRoute path="/dashboard" component={MainDashboardWrapper}/>
                        <PrivateRoute path="/settings" component={SettingsDashboardWrapper}/>
                        <PublicRoute path={"/internalError"} component={BackendError} exact={false}/>
                        <Route component={NotFound}/>
                </Switch>
        </Router>
    )
}

export default AppRouter
