// External imports
import { debounce } from 'debounce'
import {Action, action, thunkOn, ThunkOn} from 'easy-peasy'

// Internal imports
import store from '../storeSetup'
import database from '../../firebase/firebase'

export interface ActivityType {
    activityid:string,
    day:string,
    position:number
}

export interface CategoryType {
    activityid:string,
    categoryid:string,
    day:string,
    position:number
}

export type Category = {
    weekid: string,
    weekDay: number,
    categoryPosition: number,
    userid: string,
    categoryid: string | null,
    activityid: string | null
}

export interface CategoriesModel {
    // Current week's categories.
    categories:CategoryType[],
    /**
     * Sets the given week categories.
     * @param Category[] Categories of a whole week.
     */
    setCategories: Action<CategoriesModel, {categories:CategoryType[]}>
    /**
     * Updates given category. Sets the category's activity to empty string.
     * @param Category The category to be updated.
     */
    setCategory: Action<CategoriesModel, CategoryType>,
    /**
     * Updates given category's activity.
     * @param Activity The activity to be updated.
     */
    setActivity: Action<CategoriesModel, ActivityType>,

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
     * @param  day The day in which dragging occurs.
     * @param  dragCategoryid The categoryid of the drag category.
     * @param  dragActivityid The activityid of the drag category.
     */
    categoryDragSet: Action<CategoriesModel, { dragPosition:number, draggedIntoPosition:number, day:string, dragCategoryid:string, dragActivityid:string }>
}

const categoriesModel:CategoriesModel = {
    categories: [],
    setCategories: action((state, payload) => {
        state.categories = payload.categories
    }),
    setCategory: action((state, payload) => {
        const index = state.categories.findIndex(category => category.position === payload.position && category.day === payload.day)

        if (~index) {
            state.categories[index].categoryid = payload.categoryid
            state.categories[index].activityid = ""
        }
    }),
    setActivity: action((state, payload) => {
        const index = state.categories.findIndex(category => category.position === payload.position && category.day === payload.day)

        if (~index) {
            state.categories[index].activityid = payload.activityid
        }
    }),

    syncToDb: thunkOn(
        actions => [actions.categoryDragSet, actions.setCategory, actions.setActivity],
        debounce(
            async function (actions, target) {
                const uid = store.getState().auth.uid // User's id
                const {weekNr, year} = store.getState().settings.currentDate // Get current week number and year
                const categories = store.getState().activities.categories // All current week's categories

                // Fetching weekid value from auth weekYearTable
                const weekid = await database.ref(`users/${uid}/weekYearTable/${weekNr}_${year}`).once('value')

                // Updates all the categories from the given day. The categories
                // that are used as updates are taken from the store.
                const updates = {}
                categories.forEach((category, index) => {
                    if (category.day === target.payload.day) {
                        updates[`users/${uid}/categories/${weekid.val()}/${index}`] = category
                    }
                })
                
                await database.ref().update(updates)
            },
            200
        )
    ),

    categoryDragSet: action((state, payload) => {

        const dragPosition = payload.dragPosition
        const draggedIntoPosition = payload.draggedIntoPosition
        const day = payload.day
        const dragCategoryid = payload.dragCategoryid
        const dragActivityid = payload.dragActivityid

        const categoriesToUpdate = [] // categories between drag category and category dragged onto (including)

        if (dragPosition > draggedIntoPosition) { // if dragging upwards
            for (let j = draggedIntoPosition; j < dragPosition; j++) { // Iterates downwards starting from the category that was dragged onto
                categoriesToUpdate.push(j)
            }
        } else { // if dragging downwards
            for (let p = dragPosition + 1; p < draggedIntoPosition + 1; p++) { // Iterates downwards starting from the next category after the original drag category
                categoriesToUpdate.push(p)
            }
        }

        // Updates all categories from categoriesToUpdate to have categoryid and activityid of drag category
        state.categories.forEach((category, index) => {
            if (categoriesToUpdate.includes(category.position) && category.day === day) {
                state.categories[index].categoryid = dragCategoryid
                state.categories[index].activityid = dragActivityid
            }
        })
    })
}

export default categoriesModel