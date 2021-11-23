// External imports
import { Action, action, computed, Computed, thunk, Thunk } from "easy-peasy";
import { DateTime } from "luxon";

// Internal imports
import { history } from "../../routers/AppRouter";
import { sortCategoryTypesByArchived } from "./helpers";

// New ones
export type CategoryType = {
  categoryid:string,
  userid:string,
  color:string,
  name:string,
  archived:boolean
}

export type ActivityType = {
  activityid:string,
  categoryid:string,
  userid:string,
  long:string,
  short:string,
  archived:boolean
}

export interface Date {
  weekNr:number,
  year:number
}

export interface MonthDate {
  year: number,
  month: number,
  weekNr: number
}

export interface SettingsModel {
  /**
     * Indicates which time slot should be highlighted.
     */
  timeHoverIndex:number,
  /**
     * Sets the hover index.
     * @param timeHoverIndex The index that is set as the timeHoverIndex.
     */
  setHoverIndex: Action<SettingsModel, {timeHoverIndex:number}>,

  activityTypes:ActivityType[],
  setActivityTypes: Action<SettingsModel, { activityTypes:ActivityType[]}>,
  setActivityType: Action<SettingsModel, { activityType: ActivityType }>,
  createActivityType: Thunk<SettingsModel, { userid: string, activityType: ActivityType }>,
  updateActivityType: Thunk<SettingsModel, {userid: string, activityType:ActivityType}>,

  categoryTypes:CategoryType[],
  setCategoryTypes: Action<SettingsModel, { categoryTypes:CategoryType[]}>,
  setCategoryType: Action<SettingsModel, {categoryType:CategoryType}>,
  createCategoryType: Thunk<SettingsModel, {userid: string, name: string, color: string}>,
  fetchCategoryTypesFull: Thunk<SettingsModel, {userid: string}>,
  /**
     * Updates a category type's name and color.
     */
  updateCategoryType: Thunk<SettingsModel, {userid: string, categoryType:CategoryType}>,
  /**
     * Removes a given category type from stores category type array.
     */
  archiveCategoryType: Action<SettingsModel, {categoryType:CategoryType}>,
  /**
     * Restores a category type and its activities from archived.
     */
  restoreCategoryType: Action<SettingsModel, {categoryType:CategoryType}>,


  currentDate: Date,
  setDate: Action<SettingsModel, {date:Date}>,
  currentMonthDate: Computed<SettingsModel, MonthDate>,

  featurePopupViewed: boolean
  setFeaturePopupViewed: Action<SettingsModel, {featurePopupViewed: boolean}>
}

const settingsModel:SettingsModel = {
  timeHoverIndex: 0,
  setHoverIndex: action((state, payload) => {
    state.timeHoverIndex = payload.timeHoverIndex;
  }),

  activityTypes: [],
  setActivityTypes: action((state, payload) => {
    state.activityTypes = payload.activityTypes;
  }),
  setActivityType: action((state, payload) => {
    const index = state.activityTypes.findIndex((activityType) => activityType.activityid === payload.activityType.activityid);

    if (index !== -1) {
      state.activityTypes[index] = payload.activityType;
    } else {
      state.activityTypes.unshift(payload.activityType);
    }
  }),
  createActivityType: thunk(async (actions, payload) => {
    const res = await fetch(`/api/user/${payload.userid}/activity-types`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify(payload.activityType),
    });

    if (res.ok) {
      const activityType: ActivityType = await res.json();
      actions.setActivityType({ activityType });
    } else if (res.status === 401) {
      history.push("/login");
    } else {
      throw new Error("Activity could not be created.");
    }
  }),
  updateActivityType: thunk(async (actions, payload) => {
    const res = await fetch(`/api/user/${payload.userid}/activity-type/${payload.activityType.activityid}`, {
      method: "PATCH",
      mode: "cors",
      credentials: "include",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify(payload.activityType),
    });

    if (res.ok) {
      const activityType: ActivityType = await res.json();
      actions.setActivityType({ activityType });
    } else if (res.status === 401) {
      history.push("/login");
    } else if (res.status === 404) {
      throw new Error("Could not find the activity to update.");
    } else {
      throw new Error("Error occurred while updating the activity.");
    }
  }),

  categoryTypes: [],
  setCategoryTypes: action((state, payload) => {
    state.categoryTypes = payload.categoryTypes;
  }),
  setCategoryType: action((state, payload) => {
    const index = state.categoryTypes.findIndex((categoryType) => categoryType.categoryid === payload.categoryType.categoryid);

    if (index !== -1) {
      state.categoryTypes[index] = payload.categoryType;
    } else {
      state.categoryTypes.unshift(payload.categoryType);
    }
  }),
  createCategoryType: thunk(async (actions, payload) => {
    const res = await fetch(`/api/user/${payload.userid}/category-types`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({
        color: payload.color,
        name: payload.name,
      }),
    });

    if (res.ok) {
      const categoryType: CategoryType = await res.json();
      actions.setCategoryType({ categoryType });
    } else if (res.status === 401) {
      history.push("/login");
    } else {
      throw new Error("Could not create the given category.");
    }
  }),
  fetchCategoryTypesFull: thunk(async (actions, payload) => {
    const res = await fetch(`/api/user/${payload.userid}/category-types-full`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    if (res.ok) {
      const categoryTypesFull: {activityTypes: ActivityType[], categoryTypes: CategoryType[]} = await res.json();
      actions.setActivityTypes({ activityTypes: categoryTypesFull.activityTypes });
      actions.setCategoryTypes({ categoryTypes: categoryTypesFull.categoryTypes });
    } else if (res.status === 401) {
      history.push("/login");
    } else {
      throw new Error("Could not fetch category types full");
    }
  }),
  archiveCategoryType: action((state, payload) => {
    // Archive category type
    const categoryIndexToArchive = state.categoryTypes.findIndex((categoryType) => categoryType.categoryid === payload.categoryType.categoryid);
    if (categoryIndexToArchive > -1) {
      state.categoryTypes[categoryIndexToArchive].archived = true;
    }

    // Sort category types to have the unarchived ones at the top
    state.categoryTypes = sortCategoryTypesByArchived(state.categoryTypes);

    // Archive category type's activities
    for (let i = 0; i < state.activityTypes.length; i++) {
      if (state.activityTypes[i].categoryid === payload.categoryType.categoryid) {
        state.activityTypes[i].archived = true;
      }
    }
  }),
  restoreCategoryType: action((state, payload) => {
    // Restore the category type
    const categoryIndexToUpdate = state.categoryTypes.findIndex((categoryType) => categoryType.categoryid === payload.categoryType.categoryid);
    if (categoryIndexToUpdate > -1) {
      state.categoryTypes[categoryIndexToUpdate].archived = false;
    }

    // Sort category types to have the unarchived ones at the top
    state.categoryTypes = sortCategoryTypesByArchived(state.categoryTypes);

    // Restore the category type's activities
    for (let i = 0; i < state.activityTypes.length; i++) {
      if (state.activityTypes[i].categoryid === payload.categoryType.categoryid) {
        state.activityTypes[i].archived = false;
      }
    }
  }),
  updateCategoryType: thunk(async (actions, payload) => {
    const res = await fetch(`api/user/${payload.userid}/category-type/${payload.categoryType.categoryid}`, {
      method: "PATCH",
      mode: "cors",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload.categoryType),
    });

    if (res.ok) {
      const categoryType: CategoryType = await res.json();
      actions.setCategoryType({ categoryType });
    } else if (res.status === 401) {
      history.push("/login");
    }  else if (res.status === 404) {
      throw new Error("Could not find category to update.");
    } else {
      throw new Error("Could not update the category.");
    }
  }),

  currentMonthDate: computed((state) => {
    return {
      month: DateTime.fromObject({ weekNumber: state.currentDate.weekNr, weekYear: state.currentDate.year }).month,
      year: DateTime.fromObject({ weekNumber: state.currentDate.weekNr, weekYear: state.currentDate.year }).year,
      weekNr: state.currentDate.weekNr,
    };
  }),
  currentDate: {
    weekNr: DateTime.now().weekNumber,
    year: DateTime.now().startOf("week").year,
  },
  setDate: action((state, payload) => {
    state.currentDate = payload.date;
  }),
  featurePopupViewed: false,
  setFeaturePopupViewed: action((state, payload) => {
    state.featurePopupViewed = payload.featurePopupViewed;
  }),
};


export default settingsModel;
