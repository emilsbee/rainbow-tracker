import * as i from "types";
import { action, createStore, EasyPeasyConfig, Store } from "easy-peasy";

import authModel from "./auth/auth";
import notesModel from "./notes/notes";
import settingsModel from "./settings/settings";
import categoriesModel from "./categories/categories";
import analyticsModel from "./analytics/analytics";


const store: Store<i.StoreModel, EasyPeasyConfig<undefined, {}>> = createStore<i.StoreModel>({
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
