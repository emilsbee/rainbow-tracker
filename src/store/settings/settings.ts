// External imports
import {Action, action, thunk, Thunk} from "easy-peasy"
import {DateTime} from "luxon";

// Internal imports
import store from "../storeSetup";
import {history} from "../../routers/AppRouter";

// New ones
export type CategoryType = {
    categoryid:string,
    userid:string,
    color:string,
    name:string,
    archived:boolean
}

export type ActivityType = {
    activityid:string,
    categoryid:string,
    userid:string,
    long:string,
    short:string,
    archived:boolean
}

export interface Date {
    weekNr:number,
    year:number
}

export interface SettingsModel {
    /**
     * Indicates which time slot should be highlighted.
     */
    timeHoverIndex:number,
    /**
     * Sets the hover index.
     * @param timeHoverIndex The index that is set as the timeHoverIndex.
     */
    setHoverIndex: Action<SettingsModel, {timeHoverIndex:number}>,

    activityTypes:ActivityType[],
    categoryTypes:CategoryType[],
    /**
     * Sets activity types.
     * @param activityTypes to update with.
     */
    setActivityTypes: Action<SettingsModel, { activityTypes:ActivityType[]}>,
    /**
     * Sets category types.
     * @param categorySettings to update with.
     */
    setCategoryTypes: Action<SettingsModel, { categoryTypes:CategoryType[]}>,
    /**
     * Updates specific category type's name and color using the given category type.
     */
    setCategoryType: Action<SettingsModel, {categoryType:CategoryType}>,
    /**
     * Updates an activity type's long and short.
     * @param activityType to update with.
     */
    updateActivityType: Action<SettingsModel, {activityType:ActivityType}>,
    /**
     * Updates a category type's name and color.
     */
    updateCategoryType: Thunk<SettingsModel, {categoryType:CategoryType}>,

    /**
     * Date that should be displayed.
     */
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

    /**
     * Indicates whether user has seen the feature popup.
     */
    featurePopupViewed: boolean
    /**
     * Sets the feature popup viewed indicator.
     */
    setFeaturePopupViewed: Action<SettingsModel, {featurePopupViewed: boolean}>
}

const settingsModel:SettingsModel = {
    timeHoverIndex: 0,
    setHoverIndex: action((state, payload) => {
        state.timeHoverIndex = payload.timeHoverIndex
    }),

    activityTypes: [],
    categoryTypes: [],
    setActivityTypes: action((state, payload) => {
        state.activityTypes = payload.activityTypes
    }),
    setCategoryTypes: action((state, payload) => {
        state.categoryTypes = payload.categoryTypes
    }),
    setCategoryType: action((state, payload) => {
        for (let i = 0; i < state.categoryTypes.length; i++) {
            if (state.categoryTypes[i].categoryid === payload.categoryType.categoryid) {
                state.categoryTypes[i].name = payload.categoryType.name
                state.categoryTypes[i].color = payload.categoryType.color
                break;
            }
        }
    }),
    updateActivityType: action((state, payload) => {
        for (let i = 0; i < state.activityTypes.length; i++) {
            if(state.activityTypes[i].activityid === payload.activityType.activityid) {
                state.activityTypes[i].long = payload.activityType.long
                state.activityTypes[i].short = payload.activityType.short
                break;
            }
        }
    }),
    updateCategoryType: thunk(async (actions, payload) => {
        const userid = store.getState().auth.uid

        try {
            let res = await fetch(`api/user/${userid}/category-type/${payload.categoryType.categoryid}`, {
                method: "PATCH",
                mode: "cors",
                credentials: "include",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    color: payload.categoryType.color,
                    name: payload.categoryType.name
                })
            })

            if (res.ok) {
                const categoryType: CategoryType[] = await res.json()
                actions.setCategoryType({categoryType: categoryType[0]})
            } else {
                history.push("/internalError")
            }
        } catch (e) {
            history.push("/internalError")
        }
    }),

    currentDate: {
        weekNr: DateTime.now().weekNumber,
        year: DateTime.now().startOf("week").year
    },
    setDate: action((state, payload) => {
        state.currentDate = payload.date
    }),
    previousWeek: action((state, payload) => {
        const currentWeekNr = payload.date.weekNr
        const currentYear = payload.date.year

        let newWeekNr, newYear;

        if (currentWeekNr === 1) { // If current week is first week of the year
            newYear = currentYear - 1
            newWeekNr = DateTime.fromObject({weekYear:newYear}).weeksInWeekYear
        } else {
            newWeekNr = currentWeekNr -1
            newYear = currentYear
        }

        state.currentDate = {weekNr: newWeekNr, year: newYear}
    }),
    nextWeek: action((state, payload) => {
        const currentWeekNr = payload.date.weekNr
        const currentYear = payload.date.year
        const weeksInCurrentYear = DateTime.fromObject({weekYear:currentYear}).weeksInWeekYear

        let newWeekNr, newYear

        if (weeksInCurrentYear === currentWeekNr) { // If the current week is the last week of the year
            newWeekNr = 1
            newYear= currentYear + 1
        } else {
            newWeekNr = currentWeekNr + 1
            newYear = currentYear
        }

        state.currentDate = {weekNr: newWeekNr, year: newYear}
    }),
    toCurrentWeek: action((state) => {
        state.currentDate = {
            weekNr: DateTime.now().weekNumber,
            year: DateTime.now().startOf("week").year
        }
    }),

    featurePopupViewed: true,
    setFeaturePopupViewed: action((state, payload) => {
        state.featurePopupViewed = payload.featurePopupViewed
    })
}


export default settingsModel