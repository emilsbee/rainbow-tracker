import {AvailableDate} from "../../../../dao/analytics/analyticsDao";
import {DateTime} from "luxon";

/**
 * Extracts the week numbers for a given year
 * from the available dates array.
 * @param availableDates
 * @param year for which to find weeks.
 */
export const getWeekDropdownWeeks = (availableDates: AvailableDate[], year: number): number[] => {
    let weeks:  number[] = []

    for (let i = 0; i < availableDates.length; i++) {
        if (availableDates[i].year === year) {
            weeks = availableDates[i].weeks
        }
    }

    return weeks
}

/**
 * Formats an array of week numbers and a year to array of dates represented as
 * Sep 10 - Sep 16.
 * @param weeks to format.
 * @param year to format.
 */
export const formatWeeks = (weeks: number[], year: number) => {
    return weeks.map(week => `${DateTime.fromObject({weekNumber: week, weekYear: year}).startOf("week").toLocaleString({month: "short", day: "numeric"})} - 
        ${DateTime.fromObject({weekNumber: week, weekYear: year}).endOf("week").toLocaleString({month: "short", day: "numeric"})}
        `)
}