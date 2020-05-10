// External imports
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { createStore, StoreProvider } from 'easy-peasy'

//Internal imports
import firebaseModel from './models/firebase'
import weeksModel from './models/weeks'
import settingsModel from './models/settings'
import './styles/styles.scss'
import { firebase } from './components/firebase/firebase'
import LoadingPage from './components/LoadingPage/LoadingPage'
import AppRouter, { history } from './routers/AppRouter'

const store = createStore({
  auth: firebaseModel,
  weeks: weeksModel,
  settings: settingsModel
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
ReactDOM.render(<LoadingPage/>,document.getElementById('root'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch.auth.login(user.uid)
        store.dispatch.settings.startSettingsListener()
        renderApp()
        if (history.location.pathname === '/') {
            history.push(`/dashboard}`)
        }
    } else {
        store.dispatch.auth.logout()
        renderApp()
        history.push('/')
    }
})

export { store }

serviceWorker.unregister();
