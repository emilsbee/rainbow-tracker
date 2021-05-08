// External imports
import {Action, action} from "easy-peasy"

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
    setDate: Action<SettingsModel, {date:Date}>
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
        console.log(payload.categorySettings)
        state.categorySettings = payload.categorySettings
    }),

    currentDate: {
        weekNr: '0',
        year: '0'
    },
    setDate: action((state, payload) => {
        state.currentDate = payload.date
    })
}


export default settingsModel