// External imports
import {action, createStore} from 'easy-peasy'

// Internal imports
import authModel from './auth/auth'
import notesModel from './notes/notes'
import weeksModel from './weeks/weeks'
import settingsModel from './settings/settings'
import categoriesModel from './categories/categories'
import analyticsModel from './analytics/analytics'


const store = createStore({
    auth: authModel,
    settings: settingsModel,
    activities: categoriesModel,
    notes: notesModel,
    weeks: weeksModel,
    analytics: analyticsModel,
    reset: action((state, payload) => ({
        ...initialState
    }))
})

let initialState = store.getState()


export default store