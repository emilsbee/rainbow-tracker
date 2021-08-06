// External imports
import {thunk, Thunk} from 'easy-peasy'

// Internal imports
import {createWeekByWeekNrAndYear, getWeekByWeekNrAndYear} from "./helpers";
import store from "../storeSetup";
import {Category} from "../categories/categories";
import {Note} from "../notes/notes";

export type Week = {
    weekid: string,
    userid: string,
    weekNr: number,
    weekYear: number
}

export type FullWeek = Week & { categories: Category[][], notes: Note[][] }

export interface WeeksModel {
    /**
     * Fetches a week by week number and year. Guarantees that the week is
     * fetched by creating one if it doesn't exist.
     * @param weekNr of the week to fetch.
     * @param year of the week to fetch.
     */
    getWeek: Thunk<WeeksModel, {weekNr: number, year: number}>,

    /**
     * Creates a week with a given week number and year.
     * @param weekNr of the week to create.
     * @param year of the week to create.
     */
    createWeek: Thunk<WeeksModel, {weekNr: number, year: number}>,
}

const weeksModel: WeeksModel = {
    getWeek: thunk(async (actions, payload) => {
        const userid = store.getState().auth.uid

        const week: FullWeek[] = await getWeekByWeekNrAndYear(userid, payload.weekNr, payload.year)

        if (week.length === 0) {
            actions.createWeek({weekNr: payload.weekNr, year: payload.year})
        } else {
            console.log(week)
        }
    }),

    createWeek: thunk(async (actions, payload) => {
        const userid = store.getState().auth.uid

        const week: FullWeek[] = await createWeekByWeekNrAndYear(userid, payload.weekNr, payload.year)

        if (week.length !== 0) {
            console.log(week)
        }
    })
}

export default weeksModel