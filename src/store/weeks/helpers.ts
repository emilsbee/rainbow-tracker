// Internal imports
import {FullWeek} from "./weeks";

/**
 * Fetches a week by week number and year for a specific user from the api.
 * @param userid for which to fetch the week.
 * @param weekNr of the week to fetch.
 * @param year of the week to fetch.
 */
export const getWeekByWeekNrAndYear = async (userid: string, weekNr: number, year: number):Promise<FullWeek[]> => {
    const res = await fetch(`${process.env.REACT_APP_HOST}/user/${userid}/week?week_number=${weekNr}&week_year=${year}`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
    })

    if (res.ok) {
        return await res.json()
    } else {
        return []
    }
}

/**
 * Creates a week with a given week number and year for a given user.
 * @param userid for which to create the week.
 * @param weekNr of the week to create.
 * @param year of the week to create.
 */
export const createWeekByWeekNrAndYear = async (userid: string, weekNr: number, year: number):Promise<FullWeek[]> => {
    const res = await fetch(`${process.env.REACT_APP_HOST}/user/${userid}/weeks`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({
            weekNr,
            weekYear: year
        })
    })

    if (res.ok) {
        return await res.json()
    } else {
        return []
    }
}