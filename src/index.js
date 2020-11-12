// External imports
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { createStore, StoreProvider } from 'easy-peasy'


//Internal imports
import firebaseModel from './models/firebase/firebase'
import notesModel from './models/notes/notes'
import settingsModel from './models/settings/settings'
import initialiseModel from './models/initialise/initialise'
import categoriesModel from './models/categories/categories'
import { firebase } from './components/firebase/firebase'
import LoadingPage from './components/LoadingPage/LoadingPage'
import AppRouter, { history } from './routers/AppRouter'
import './styles/styles.scss'

// Configuring environment variables
require('dotenv').config()


const store = createStore({
  auth: firebaseModel,
  settings: settingsModel,
  init: initialiseModel,
  activities: categoriesModel,
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
        store.dispatch.auth.login(user.uid) // Updates the uid state in easy-peasy auth model
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


