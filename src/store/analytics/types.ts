import * as i from "types";
import { Action, Thunk } from "easy-peasy";

export type TotalPerDay = {
  weekDay: number
  categories: {
    categoryid: string | null
    count: number
    weekDay: number
    name: string
  }[]
  activities: {
    activityid: string | null
    count: number
    weekDay: number
  }[]
}

export type TotalPerWeekActivityType = i.ActivityType & { count: number }
export type TotalPerWeekCategoryType = i.CategoryType & {count: number }
export type TotalPerWeek = {
  categoryTypes: i.TotalPerWeekCategoryType[],
  activityTypes: i.TotalPerWeekActivityType[]
}

export type TotalPerMonthActivityType = i.ActivityType & { count: number }
export type TotalPerMonthCategoryType = i.CategoryType & {count: number }
export type TotalPerMonth = {
  categoryTypes: i.TotalPerMonthCategoryType[],
  activityTypes: i.TotalPerMonthActivityType[]
}

export type AvailableDate = {
  year: number,
  weeks: number[]
}

export type AvailableMonth = {
  year: number
  month: number // 1-12
  weekNr: number
}

export interface AnalyticsModel {
  totalPerWeek: i.TotalPerWeek,
  setTotalPerWeek: Action<i.AnalyticsModel, {totalPerWeek: i.TotalPerWeek}>,
  fetchTotalPerWeek: Thunk<i.AnalyticsModel, {userid: string, weekNr: number, year: number}>,

  totalPerDay: i.TotalPerDay[],
  setTotalPerDay: Action<i.AnalyticsModel, {totalPerDay: i.TotalPerDay[]}>,
  fetchTotalPerDay: Thunk<i.AnalyticsModel, {userid: string, weekNr: number, year: number}>,

  availableDates: i.AvailableDate[],
  setAvailableDates: Action<i.AnalyticsModel, {availableDates: i.AvailableDate[]}>,
  fetchAvailableDates: Thunk<AnalyticsModel, {userid: string}>,

  availableMonths: i.AvailableMonth[],
  setAvailableMonths: Action<i.AnalyticsModel, {availableMonths: i.AvailableMonth[]}>,
  fetchAvailableMonths: Thunk<i.AnalyticsModel, {userid: string}>,

  totalPerMonth: i.TotalPerMonth,
  setTotalPerMonth: Action<i.AnalyticsModel, {totalPerMonth: i.TotalPerMonth}>,
  fetchTotalPerMonth: Thunk<i.AnalyticsModel, {userid: string, month: number, year: number}>
}
