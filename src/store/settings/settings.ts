// External imports
import {Action, action, thunk, Thunk} from "easy-peasy"
import {DateTime} from "luxon";

// Internal imports
import store from "../storeSetup";
import {history} from "../../routers/AppRouter";
import {createCategory} from "../../dao/settingsDao";
import {sortCategoryTypesByArchived} from "./helpers";

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
    fetchCategoryTypesFull: Thunk<SettingsModel, {userid: string}>,
    /**
     * Updates specific category type's name and color using the given category type.
     */
    setCategoryType: Action<SettingsModel, {categoryType:CategoryType}>,
    /**
     * Updates a category type's name and color.
     */
    updateCategoryType: Thunk<SettingsModel, {categoryType:CategoryType}>,
    /**
     * Removes a given category type from stores category type array.
     */
    archiveCategoryType: Action<SettingsModel, {categoryType:CategoryType}>,
    /**
     * Restores a category type and its activities from archived.
     */
    restoreCategoryType: Action<SettingsModel, {categoryType:CategoryType}>,
    /**
     * Creates a given activity type.
     */
    createActivityType: Action<SettingsModel, { activityType: ActivityType }>,
    /**
     * Updates an activity type's long and short.
     */
    updateActivityType: Action<SettingsModel, {activityType:ActivityType}>,
    /**
     * Archives given activity type.
     */
    archiveActivityType: Action<SettingsModel, {activityType:ActivityType}>,
    /**
     * Restores given activity type.
     */
    restoreActivityType: Action<SettingsModel, {activityType:ActivityType}>,
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
    fetchCategoryTypesFull: thunk(async (actions, payload) => {
        let res = await fetch(`api/user/${payload.userid}/category-types-full`, {
            method: "GET",
            mode: "cors",
            credentials: "include",
        })

        if (res.ok) {
            const categoryTypesFull: {activityTypes: ActivityType[], categoryTypes: CategoryType[]} = await res.json()
            actions.setActivityTypes({activityTypes: categoryTypesFull.activityTypes})
            actions.setCategoryTypes({categoryTypes: categoryTypesFull.categoryTypes})
        } else if (res.status === 401) {
            history.push("/login")
        } else {
            throw new Error("Could not fetch category types full")
        }
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
    archiveCategoryType: action((state, payload) => {
        // Archive category type
        const categoryIndexToArchive = state.categoryTypes.findIndex(categType => categType.categoryid === payload.categoryType.categoryid)
        if (categoryIndexToArchive > -1) {
            state.categoryTypes[categoryIndexToArchive].archived = true
        }

        // Sort category types to have the unarchived ones at the top
        state.categoryTypes = sortCategoryTypesByArchived(state.categoryTypes)

        // Archive category type's activities
        for (let i = 0; i < state.activityTypes.length; i++) {
            if (state.activityTypes[i].categoryid === payload.categoryType.categoryid) {
                state.activityTypes[i].archived = true
            }
        }
    }),
    restoreCategoryType: action((state, payload) => {
        // Restore the category type
        const categoryIndexToUpdate = state.categoryTypes.findIndex(categoryType => categoryType.categoryid === payload.categoryType.categoryid)
        if (categoryIndexToUpdate > -1) {
            state.categoryTypes[categoryIndexToUpdate].archived = false
        }

        // Sort category types to have the unarchived ones at the top
        state.categoryTypes = sortCategoryTypesByArchived(state.categoryTypes)

        // Restore the category type's activities
        for (let i = 0; i < state.activityTypes.length; i++) {
            if (state.activityTypes[i].categoryid === payload.categoryType.categoryid) {
                state.activityTypes[i].archived = false
            }
        }
    }),
    createActivityType: action((state, payload) => {
        state.activityTypes[state.activityTypes.length] = payload.activityType
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
    archiveActivityType: action((state, payload) => {
       const activityIndexToArchive = state.activityTypes.findIndex(activityType => activityType.activityid === payload.activityType.activityid)

       if (activityIndexToArchive > -1) {
           state.activityTypes[activityIndexToArchive].archived = true
       }
    }),
    restoreActivityType: action((state, payload) => {
        const activityIndexToRestore = state.activityTypes.findIndex(activityType => activityType.activityid === payload.activityType.activityid)

        if (activityIndexToRestore > -1) {
            state.activityTypes[activityIndexToRestore].archived = false
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
                history.push("/internal-error")
            }
        } catch (e) {
            history.push("/internal-error")
        }
    }),

    currentDate: {
        weekNr: DateTime.now().weekNumber,
        year: DateTime.now().startOf("week").year
    },
    setDate: action((state, payload) => {
        state.currentDate = payload.date
    }),
    featurePopupViewed: false,
    setFeaturePopupViewed: action((state, payload) => {
        state.featurePopupViewed = payload.featurePopupViewed
    })
}


export default settingsModel