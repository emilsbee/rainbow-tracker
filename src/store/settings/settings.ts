// External imports
import {Action, action} from "easy-peasy"
import {DateTime} from "luxon";

// Internal imports

export interface ActivitySettings {
    activitySettingsid: {
        categoryid:string,
        long:string,
        short:string,
    }
}

export interface CategorySettings {
    categorySettingsid: {
        category:string,
        color:string
    }
}

export interface Date {
    weekNr:string,
    year:string
}

export interface SettingsModel {
    // Indicates which time slot should be highlighted.
    timeHoverIndex:number,
    /**
     * Sets the hover index.
     * @param timeHoverIndex The index that is set as the timeHoverIndex.
     */
    setHoverIndex: Action<SettingsModel, {timeHoverIndex:number}>,

    // ActivityType settings contain the actual activity objects.
    activitySettings:ActivitySettings,
    // CategoryType settings contain the actual category objects.
    categorySettings:CategorySettings,
    /**
     * Sets activity settings.
     * @param activitySettings The settings that are to be set.
     */
    setActivitySettings: Action<SettingsModel, { activitySettings:ActivitySettings}>,
    /**
     * Sets category settings.
     * @param categorySettings The settings that are to be set.
     */
    setCategorySettings: Action<SettingsModel, { categorySettings:CategorySettings}>,

    // Date that should be displayed.
    currentDate: Date,
    /**
     * Sets date.
     * @param date The Date that is to be set. Date: {weekNr, year}.
     */
    setDate: Action<SettingsModel, {date:Date}>,
    /**
     * Sets the previous weeks date given some week and year.
     */
    previousWeek:Action<SettingsModel, {date:Date}>,
    /**
     * Sets the next weeks date given some week and year.
     */
    nextWeek: Action<SettingsModel, {date:Date}>,
    /**
     * Sets the date to the current real life week.
     */
    toCurrentWeek: Action<SettingsModel>
}

const settingsModel:SettingsModel = {
    timeHoverIndex: null,
    setHoverIndex: action((state, payload) => {
        state.timeHoverIndex = payload.timeHoverIndex
    }),

    activitySettings: null,
    categorySettings: null,
    setActivitySettings: action((state, payload) => {
        state.activitySettings = payload.activitySettings
    }),

    setCategorySettings: action((state, payload) => {
        state.categorySettings = payload.categorySettings
    }),

    currentDate: {
        weekNr: DateTime.now().weekNumber.toString(),
        year: DateTime.now().startOf("week").year.toString()
    },
    setDate: action((state, payload) => {
        state.currentDate = payload.date
    }),
    previousWeek: action((state, payload) => {
        const currentWeekNr = parseInt(payload.date.weekNr)
        const currentYear = parseInt(payload.date.year)

        let newWeekNr, newYear;

        if (currentWeekNr === 1) { // If current week is first week of the year
            newYear = currentYear - 1
            newWeekNr = DateTime.fromObject({weekYear:newYear}).weeksInWeekYear
        } else {
            newWeekNr = currentWeekNr -1
            newYear = currentYear
        }

        state.currentDate = {weekNr: newWeekNr.toString(), year: newYear.toString()}
    }),
    nextWeek: action((state, payload) => {
        const currentWeekNr = parseInt(payload.date.weekNr)
        const currentYear = parseInt(payload.date.year)
        const weeksInCurrentYear = DateTime.fromObject({weekYear:currentYear-1}).weeksInWeekYear

        let newWeekNr, newYear

        if (weeksInCurrentYear === currentWeekNr) { // If the current week is the last week of the year
            newWeekNr = 1
            newYear= currentYear + 1
        } else {
            newWeekNr = currentWeekNr + 1
            newYear = currentYear
        }

        state.currentDate = {weekNr: newWeekNr.toString(), year: newYear.toString()}
    }),
    toCurrentWeek: action((state) => {
        state.currentDate = {
            weekNr: DateTime.now().weekNumber.toString(),
            year: DateTime.now().startOf("week").year.toString()
        }
    })
}


export default settingsModel