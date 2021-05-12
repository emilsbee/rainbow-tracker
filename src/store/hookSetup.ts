// External imports
import { createTypedHooks } from 'easy-peasy'

// Internal imports
import {SettingsModel} from './settings/settings'
import {CategoriesModel} from './categories/categories'
import {AuthModel} from './auth/auth'
import {NotesModel} from "./notes/notes";

interface StoreModel {
    settings:SettingsModel,
    activities:CategoriesModel,
    auth:AuthModel,
    notes:NotesModel
}

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;


