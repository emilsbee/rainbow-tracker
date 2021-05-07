// External imports
import React from 'react'
import { createBrowserHistory } from 'history'
import {Router, Route, Switch} from 'react-router-dom'
import { useStoreState } from 'easy-peasy'


// Internal imports
import MainDashboardWrapper from '../components/MainDashboard/MainDashboardWrapper'
import LoginPage from '../components/LoginPage/LoginPage'
import NotFound from '../components/NotFound/NotFound'
import AnalyticsDashboardWrapper from '../components/AnalyticsDashboard/AnalyticsDashboardWrapper'
import SettingsDashboard from '../components/SettingsDashboard/SettingsDashboard'
import NavBar from '../components/NavBar/NavBar'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'


export const history = createBrowserHistory()

const AppRouter = () => {
    const uid = useStoreState(state => state.auth.uid)

    return (
        <Router history={history}>
            <div>
                {uid !== "" && <NavBar />}
                <Switch>
                        <PublicRoute path="/" component={LoginPage} exact={true}/>
                        <PrivateRoute path="/dashboard" component={MainDashboardWrapper}/>
                        <PrivateRoute path="/settings" component={SettingsDashboard}/>
                        <PrivateRoute path="/analytics" component={AnalyticsDashboardWrapper}/>
                        <Route component={NotFound}/>  
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter
