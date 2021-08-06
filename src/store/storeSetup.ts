// External imports
import {Action, action, createStore} from 'easy-peasy'

// Internal imports
import authModel from './auth/auth'
import notesModel from './notes/notes'
import settingsModel from './settings/settings'
import categoriesModel from './categories/categories'
import analyticsModel from './analytics/analytics'
import {SettingsModel} from './settings/settings'
import {CategoriesModel} from './categories/categories'
import {AuthModel} from './auth/auth'
import {NotesModel} from "./notes/notes";
import {AnalyticsModel} from "./analytics/analytics"
import weeksModel, {WeeksModel} from "./weeks/weeks";

export interface StoreModel {
    settings:SettingsModel,
    activities:CategoriesModel,
    auth:AuthModel,
    notes:NotesModel,
    analytics:AnalyticsModel,
    weeks:WeeksModel
    /**
     * Used to reset store state to the initial state empty state.
     */
    reset: Action<StoreModel>
}


const store = createStore<StoreModel>({
    auth: authModel,
    settings: settingsModel,
    activities: categoriesModel,
    notes: notesModel,
    analytics: analyticsModel,
    weeks: weeksModel,
    reset: action((state, payload) => ({
        ...initialState
    }))
})

let initialState = store.getState()

export default store