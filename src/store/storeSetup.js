// External imports
import { createStore } from 'easy-peasy'

// Internal imports
import authModel from './auth/auth'
import notesModel from './notes/notes'
import weeksModel from './weeks/weeks'
import settingsModel from './settings/settings'
import initialiseModel from './initialise/initialise'
import categoriesModel from './categories/categories'
import analyticsModel from './analytics/analytics'


const store = createStore({
    auth: authModel,
    settings: settingsModel,
    init: initialiseModel,
    activities: categoriesModel,
    notes: notesModel,
    weeks: weeksModel,
    analytics: analyticsModel
})


export default store