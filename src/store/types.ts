import * as i from "types";
import { Action } from "easy-peasy";

export interface StoreModel {
  settings: i.SettingsModel,
  auth: i.AuthModel,
  notes: i.NotesModel,
  categories: i.CategoriesModel,
  analytics: i.AnalyticsModel

  reset: Action<i.StoreModel>
}

export * from "./notes/types";
export * from "./auth/types";
export * from "./categories/types";
export * from "./settings/types";
export * from "./analytics/types";
