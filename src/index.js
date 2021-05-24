// External imports
import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from 'easy-peasy'

//Internal imports
import * as serviceWorker from './serviceWorker';
import store from "./store/storeSetup"
import database, { firebase } from './firebase/firebase'
import LoadingPage from './components/LoadingPage/LoadingPage'
import AppRouter, { history } from './routers/AppRouter'
import './styles/styles.scss'
import {createData} from "./utils/dataGenerators";

// Configuring environment variables
require('dotenv').config()

let hasRendered = false;
const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(
            <StoreProvider store={store}>
                <AppRouter/>
            </StoreProvider>,
            document.getElementById('root')
        )
        hasRendered = true;
    }
}

// If nothing is being rendered, display loading page
ReactDOM.render(<LoadingPage/>,document.getElementById('root'));

/**
 * Listener for use authentication state.
 */
firebase.auth().onAuthStateChanged( async (user) => {
    if (user) {
        store.dispatch.auth.login({userId: user.uid}) // Sets the uid in store

        const init = await database.ref(`users/${user.uid}/init`).once('value')

        if (init.val() == null) {
            const {activitySettings, categorySettings} = createData()
            let updates = {}
            updates[`users/${user.uid}/activitySettings`] = activitySettings
            updates[`users/${user.uid}/categorySettings`] = categorySettings
            updates[`users/${user.uid}/init`] = true
            await database.ref().update(updates)
        }

        store.dispatch.analytics.startCategoryListener()
        renderApp()
        if (history.location.pathname === '/') {
            history.push(`/dashboard`)
        }
    } else {
        store.dispatch.auth.logout()
        renderApp()
        history.push('/')
    }
})

serviceWorker.unregister();


