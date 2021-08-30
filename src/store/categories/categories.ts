// External imports
import { debounce } from 'debounce'
import {Action, action, thunkOn, ThunkOn} from 'easy-peasy'

// Internal imports
import store from '../storeSetup'
import {Note} from "../notes/notes";
import {history} from "../../routers/AppRouter";

export type Week = {
    weekid: string,
    userid: string,
    weekNr: number,
    weekYear: number
}

export type FullWeek = Week & { categories: Category[][], notes: Note[][] }

export type Category = {
    weekid: string,
    weekDay: number,
    categoryPosition: number,
    userid: string,
    categoryid: string | null,
    activityid: string | null,
    weekDayDate: string
}

export interface CategoriesModel {
    // Current week's categories.
    categories:Category[][],

    /**
     * Sets categories.
     * @param Category[][ Categories to set.
     */
    setCategories: Action<CategoriesModel, {categories:Category[][]}>

    /**
     * Updates a category in state with the given category.
     * Also, sets the category's activity to empty string.
     * @param Category The category to be updated.
     */
    setCategory: Action<CategoriesModel, Category>,

    /**
     * Updates a category's activity.
     * @param categoryPosition of the category for which to update activity.
     * @param weekDay of the category to update.
     * @param activityid of the activity to update with.
     */
    setActivity: Action<CategoriesModel, { categoryPosition: number, weekDay: number, activityid: string }>,

    /**
     * Debounced function that runs when 200ms have passed
     * since the last call of either categoryDragSet, setCategory or setActivity.
     * Once it runs, it updates auth with the latest category updates.
     * @param day The day that is to be updated from the current week.
     */
    syncToDb: ThunkOn<CategoriesModel>,

    /**
     * Updates categories and their respective activities between the drag
     * category and the category that was dragged onto.
     * Works for both dragging upwards and downwards. The dragging can occur without touching
     * categories between the drag category and the dragged onto category. This method will "fill"
     * in the missed categories as if they were dragged onto.
     * @param  dragPosition Position of the category currently being dragged (drag category).
     * @param  draggedIntoPosition Position of the category that was dragged onto.
     * @param  weekDay The day in which dragging occurs.
     * @param  dragCategoryid The categoryid of the drag category.
     * @param  dragActivityid The activityid of the drag category.
     */
    categoryDragSet: Action<CategoriesModel, { dragPosition:number, draggedIntoPosition:number, weekDay: number, dragCategoryid:string | null, dragActivityid:string | null }>
}

const categoriesModel:CategoriesModel = {
    categories: [],
    setCategories: action((state, payload) => {
        state.categories = payload.categories
    }),
    setCategory: action((state, payload) => {
        let dayIndex = -1;
        let categoryIndex = -1;

        for (let i = 0; i < state.categories.length; i++) {
            for (let j = 0; j < state.categories[i].length; j++) {
                let category = state.categories[i][j]

                if (category.categoryPosition === payload.categoryPosition && category.weekDay === payload.weekDay) {
                    dayIndex = i
                    categoryIndex = j
                    break;
                }
            }
         }

        if (dayIndex !== -1 && categoryIndex !== -1) {
            state.categories[dayIndex][categoryIndex].categoryid = payload.categoryid
            state.categories[dayIndex][categoryIndex].activityid = null
        }
    }),
    setActivity: action((state, payload) => {
        let dayIndex = -1
        let categoryIndex = -1

        for (let i = 0; i < state.categories.length; i++) {
            for (let j = 0; j < state.categories[i].length; j++) {
                let category = state.categories[i][j]

                if (category.categoryPosition === payload.categoryPosition && category.weekDay === payload.weekDay) {
                    dayIndex = i
                    categoryIndex = j
                    break;
                }
            }
        }

        if (dayIndex !== -1 && categoryIndex !== -1) {
            state.categories[dayIndex][categoryIndex].activityid = payload.activityid
        }
    }),
    syncToDb: thunkOn(
        actions => [actions.categoryDragSet, actions.setCategory, actions.setActivity],
        // @ts-ignore
        debounce(
            async function (actions, target) {
                const userid: string = store.getState().auth.uid // User's id
                const categories: Category[][] = store.getState().categories.categories // All current week's categories
                const weekDay: number = target.payload.weekDay

                try {
                    let res = await fetch(`api/user/${userid}/week/${categories[0][0].weekid}/day/${weekDay}/categories `, {
                        method: "PATCH",
                        mode: "cors",
                        credentials: "include",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(categories[weekDay])
                    })

                    if (!res.ok) {
                        history.push("/internalError")
                    }
                } catch (e) {
                    history.push("/internalError")
                }
            },
            200
        )
    ),

    categoryDragSet: action((state, payload) => {

        const dragPosition = payload.dragPosition
        const draggedIntoPosition = payload.draggedIntoPosition
        const weekDay = payload.weekDay
        const dragCategoryid = payload.dragCategoryid
        const dragActivityid = payload.dragActivityid

        const categoriesToUpdate = [] // categories between drag category and category dragged onto (including)

        if (dragPosition > draggedIntoPosition) { // if dragging upwards
            for (let c = draggedIntoPosition; c < dragPosition; c++) { // Iterates downwards starting from the category that was dragged onto
                categoriesToUpdate.push(c)
            }
        } else { // if dragging downwards
            for (let p = dragPosition + 1; p < draggedIntoPosition + 1; p++) { // Iterates downwards starting from the next category after the original drag category
                categoriesToUpdate.push(p)
            }
        }

        for (let i = 0; i < state.categories.length; i++) {
            for (let j = 0; j < state.categories[i].length; j++) {
                let category = state.categories[i][j]

                if (categoriesToUpdate.includes(category.categoryPosition) && category.weekDay === weekDay) {
                    state.categories[i][j].categoryid = dragCategoryid
                    state.categories[i][j].activityid = dragActivityid
                }
            }
        }
    })
}

export default categoriesModel