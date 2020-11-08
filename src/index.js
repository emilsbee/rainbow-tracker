// External imports
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { createStore, StoreProvider } from 'easy-peasy'


//Internal imports
import firebaseModel from './models/firebase'
import notesModel from './models/notes/notes'
import weeksModel from './models/weeks/weeks'
import settingsModel from './models/settings'
import initialiseModel from './models/initialise'
import activitiesModel from './models/activities'
import { firebase } from './components/firebase/firebase'
import LoadingPage from './components/LoadingPage/LoadingPage'
import AppRouter, { history } from './routers/AppRouter'
import './styles/styles.scss'

// Configuring environment variables
require('dotenv').config()


const store = createStore({
  auth: firebaseModel,
  weeks: weeksModel,
  settings: settingsModel,
  init: initialiseModel,
  activities: activitiesModel,
  notes: notesModel
})



const jsx = (
  <StoreProvider store={store}>
      <AppRouter/>
  </StoreProvider>
)

let hasRendered = false;
const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('root'))
        hasRendered = true;
    }
}

// If nothin is being rendered, display loading page
ReactDOM.render(<LoadingPage/>,document.getElementById('root'));

firebase.auth().onAuthStateChanged( async (user) => {
    if (user) {
        store.dispatch.auth.login(user.uid)
        store.dispatch.init.initialiseUser().then(() => {
            renderApp()
            if (history.location.pathname === '/') {
                history.push(`/dashboard`)
            }
        })
    } else {
        store.dispatch.auth.logout()
        renderApp()
        history.push('/')
    }
})

export { store }

serviceWorker.unregister();


