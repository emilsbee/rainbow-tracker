// External imports
import { createTypedHooks } from 'easy-peasy'

// Internal imports
import {SettingsModel} from './settings/settings'
import {CategoriesModel} from './categories/categories'
import {AuthModel} from './auth/auth'

interface StoreModel {
    settings:SettingsModel,
    activities:CategoriesModel,
    auth:AuthModel
}

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;


