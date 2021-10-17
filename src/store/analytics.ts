// External imports
import {Action, action, thunk, Thunk} from "easy-peasy"

// Internal imports
import {ActivityType, CategoryType} from "./settings/settings";

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

type TotalPerWeekActivityType = ActivityType & { count: number }
type TotalPerWeekCategoryType = CategoryType & {count: number }
export type TotalPerWeek = {
    categoryTypes: TotalPerWeekCategoryType[],
    activityTypes: TotalPerWeekActivityType[]
}

export type AvailableDate = {
    year: number,
    weeks: number[]
}

export interface AnalyticsModel {
    totalPerWeek: TotalPerWeek,
    setTotalPerWeek: Action<AnalyticsModel, {totalPerWeek: TotalPerWeek}>,
    fetchTotalPerWeek: Thunk<AnalyticsModel, {userid: string, weekNr: number, year: number}>,

    totalPerDay: TotalPerDay[],
    setTotalPerDay: Action<AnalyticsModel, {totalPerDay: TotalPerDay[]}>,
    fetchTotalPerDay: Thunk<AnalyticsModel, {userid: string, weekNr: number, year: number}>,

    availableDates: AvailableDate[],
    setAvailableDates: Action<AnalyticsModel, {availableDates: AvailableDate[]}> ,
    fetchAvailableDates: Thunk<AnalyticsModel, {userid: string}>
}

const analyticsModel: AnalyticsModel = {
    totalPerWeek: {activityTypes: [], categoryTypes: []},
    setTotalPerWeek: action((state, payload) => {
        state.totalPerWeek = payload.totalPerWeek
    }),
    fetchTotalPerWeek: thunk(async (actions, payload) => {
        let res = await fetch(`api/user/${payload.userid}/analytics/total-per-week?week_number=${payload.weekNr}&week_year=${payload.year}`, {
            method: "GET",
            mode: "cors",
            credentials: "include",
        })

        if (res.ok) {
            const totalPerWeek: TotalPerWeek = await res.json()
            actions.setTotalPerWeek({totalPerWeek})
        } else if (res.status === 404) {
            throw new Error("This week has no analytics.")
        } else {
            throw new Error(`Error occurred while fetching analytics for this week.`)
        }
    }),

    totalPerDay: [],
    setTotalPerDay: action((state, payload) => {
        state.totalPerDay = payload.totalPerDay
    }),
    fetchTotalPerDay: thunk(async (actions, payload) => {
        let res = await fetch(`api/user/${payload.userid}/analytics/total-per-day?week_number=${payload.weekNr}&week_year=${payload.year}`, {
            method: "GET",
            mode: "cors",
            credentials: "include",
        })

        if (res.ok) {
            const totalPerDay: TotalPerDay[] = await res.json()
            actions.setTotalPerDay({totalPerDay})
        } else if (res.status === 404) {
            throw new Error("This week has no analytics.")
        } else {
            throw new Error(`Error occurred while fetching analytics for this week.`)
        }
    }),

    availableDates: [],
    setAvailableDates: action((state, payload) => {
        state.availableDates = payload.availableDates
    }),
    fetchAvailableDates: thunk(async (actions, payload) => {
        let res = await fetch(`api/user/${payload.userid}/analytics/available-dates`, {
            method: "GET",
            mode: "cors",
            credentials: "include",
        })

        if (res.ok) {
            const availableDates: AvailableDate[] = await res.json()
            actions.setAvailableDates({availableDates})
        } else {
            throw new Error(`Could not fetch available dates for user ${payload.userid}.`)
        }
    })
}

export default analyticsModel