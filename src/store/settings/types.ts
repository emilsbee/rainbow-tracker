import * as i from 'types';
import { Action,  Computed, Thunk } from 'easy-peasy';

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
  timeHoverIndex:number,
  setHoverIndex: Action<i.SettingsModel, {timeHoverIndex:number}>,

  activityTypes: i.ActivityType[],
  setActivityTypes: Action<i.SettingsModel, { activityTypes: i.ActivityType[]}>,
  setActivityType: Action<i.SettingsModel, { activityType: i.ActivityType }>,
  createActivityType: Thunk<i.SettingsModel, { userid: string, activityType: i.ActivityType }>,
  updateActivityType: Thunk<i.SettingsModel, {userid: string, activityType: i.ActivityType}>,

  categoryTypes: i.CategoryType[],
  setCategoryTypes: Action<i.SettingsModel, { categoryTypes: i.CategoryType[]}>,
  setCategoryType: Action<i.SettingsModel, {categoryType: i.CategoryType}>,
  createCategoryType: Thunk<i.SettingsModel, {userid: string, name: string, color: string}>,
  fetchCategoryTypesFull: Thunk<i.SettingsModel, {userid: string}>,
  updateCategoryType: Thunk<i.SettingsModel, {userid: string, categoryType: i.CategoryType}>,
  archiveCategoryType: Action<i.SettingsModel, {categoryType: i.CategoryType}>,
  restoreCategoryType: Action<i.SettingsModel, {categoryType:i.CategoryType}>,

  currentDate: i.Date,
  setDate: Action<i.SettingsModel, {date: i.Date}>,
  currentMonthDate: Computed<i.SettingsModel, i.MonthDate>,
}
