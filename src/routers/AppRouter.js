// External imports
import React from 'react'
import { createBrowserHistory } from 'history'
import {Router, Route, Switch} from 'react-router-dom'


// Internal imports
import MainDashboard from '../components/MainDashboard/MainDashboard'
import LoginPage from '../components/LoginPage/LoginPage'
import NotFound from '../components/NotFound/NotFound'
import AnalyticsDashboardWrapper from '../components/AnalyticsDashboard/AnalyticsDashboardWrapper'
import SettingsDashboard from '../components/SettingsDashboard/SettingsDashboard'
import NavBar from '../components/NavBar/NavBar'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import { useStoreState } from 'easy-peasy'


export const history = createBrowserHistory()

const AppRouter = () => {
    const uid = useStoreState(state => state.auth.uid)

    return (
        <Router history={history}>
            <div style={{display: "flex", flexDirection: 'column', height: '100%'}}>
                {uid !== "" && <NavBar />}
                <Switch>
                        <PublicRoute path="/" component={LoginPage} exact={true}/>
                        <PrivateRoute path="/dashboard" component={MainDashboard}/>
                        <PrivateRoute path="/settings" component={SettingsDashboard}/>
                        <PrivateRoute path="/analytics" component={AnalyticsDashboardWrapper}/>
                        <Route component={NotFound}/>  
                </Switch>
                
            </div>
        </Router>
    )
}

export default AppRouter
