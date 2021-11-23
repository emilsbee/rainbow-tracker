// External imports
import { Action, action, createStore, EasyPeasyConfig, Store } from "easy-peasy";

// Internal imports
import authModel, { AuthModel } from "./auth/auth";
import notesModel, { NotesModel } from "./notes/notes";
import settingsModel, { SettingsModel } from "./settings/settings";
import categoriesModel, { CategoriesModel } from "./categories/categories";
import analyticsModel, { AnalyticsModel } from "./analytics";

export interface StoreModel {
  settings:SettingsModel,
  auth:AuthModel,
  notes:NotesModel,
  categories:CategoriesModel,
  analytics: AnalyticsModel
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
  analytics: analyticsModel,
  reset: action((state, payload) => ({
    ...initialState,
  })),
});

const initialState = store.getState();

export default store;
