// Internal imports
import {history} from "../routers/AppRouter";

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
export const getTotalPerDay = async (userid: string, weekNr: number, year: number):Promise<TotalPerDay[]> => {
    try {
        let res = await fetch(`api/user/${userid}/analytics/total-per-day?week_number=${weekNr}&week_year=${year}`, {
            method: "GET",
            mode: "cors",
            credentials: "include",
        })

        let totalPerDay: TotalPerDay[];

        if (res.ok) {
            totalPerDay = await res.json()
        } else {
            if (res.status !== 404) {
                history.push("/internal-error")
            }

            totalPerDay = []
        }

        return totalPerDay
    } catch (e) {
        history.push("/internal-error")
        return []
    }
}

export type TotalPerWeek = {
    categoryTypes: {categoryid: string, count: number, name: string, color: string}[],
    activityTypes: {activityid: string, count: number, categoryid: string, long: string, short: string}[]
}
/**
 * Fetches the total per week which basically is the amount of time spent for each category and
 * activity type.
 * @param userid of user for which to fetch total per week.
 * @param weekNr of week for which to fetch total per week.
 * @param year of week for which to fetch total per week.
 */
export const getTotalPerWeek = async (userid: string, weekNr: number, year: number):Promise<TotalPerWeek> => {
    try {
        let res = await fetch(`api/user/${userid}/analytics/total-per-week?week_number=${weekNr}&week_year=${year}`, {
            method: "GET",
            mode: "cors",
            credentials: "include",
        })

        let totalPerWeek: TotalPerWeek;

        if (res.ok) {
            totalPerWeek = await res.json()
        } else {
            if (res.status !== 404) {
                history.push("/internal-error")
            }

            totalPerWeek = {categoryTypes: [], activityTypes: []}
        }

        return totalPerWeek
    } catch (e) {
        history.push("/internal-error")
        return {categoryTypes: [], activityTypes: []}
    }
}

export type AvailableDate = {
    year: number,
    weeks: number[]
}
export const getAvailableDates = async (userid: string): Promise<AvailableDate[]> => {
    try {
        let res = await fetch(`api/user/${userid}/analytics/available-dates`, {
            method: "GET",
            mode: "cors",
            credentials: "include",
        })

        let availableDates: AvailableDate[] = []

        if (res.ok) {
            availableDates = await res.json()
        } else {
            history.push("/internal-error")
        }

        return availableDates
    } catch (e) {
        history.push("/internal-error")
        return []
    }
}