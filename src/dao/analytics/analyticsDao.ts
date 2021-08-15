// Internal imports
import {history} from "../../routers/AppRouter";

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
export const getTotalPerWeek = async (userid: string, weekNr: number, year: number):Promise<TotalPerWeek[]> => {
    try {
        let res = await fetch(`${process.env.REACT_APP_HOST}/user/${userid}/analytics/total-per-week?week_number=${weekNr}&week_year=${year}`, {
            method: "GET",
            mode: "cors",
            credentials: "include",
        })

        let totalPerWeek;
        if (res.ok) {
            totalPerWeek = await res.json()
        } else {
            if (res.status !== 404) {
                history.push("/internalError")
            }

            totalPerWeek = []
        }

        return totalPerWeek
    } catch (e) {
        history.push("/internalError")
        return []
    }
}