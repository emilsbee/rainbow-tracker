// External imports
import {Action, action, createStore, EasyPeasyConfig, Store} from 'easy-peasy'

// Internal imports
import authModel from './auth/auth'
import notesModel from './notes/notes'
import settingsModel from './settings/settings'
import {SettingsModel} from './settings/settings'
import categoriesModel, {CategoriesModel} from './categories/categories'
import {AuthModel} from './auth/auth'
import {NotesModel} from "./notes/notes";

export interface StoreModel {
    settings:SettingsModel,
    auth:AuthModel,
    notes:NotesModel,
    categories:CategoriesModel,
    /**
     * Used to reset store state to the initial state empty state.
     */
    reset: Action<StoreModel>
}


const store: Store<StoreModel, EasyPeasyConfig<undefined, {}>> = createStore<StoreModel>({
    auth: authModel,
    settings: settingsModel,
    notes: notesModel,
    categories: categoriesModel,
    reset: action((state, payload) => ({
        ...initialState
    }))
})

let initialState = store.getState()

export default store