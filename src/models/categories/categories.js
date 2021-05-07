// External imports
import { debounce } from 'debounce'
import { action, thunkOn } from 'easy-peasy'

// Internal imports
import { store } from '../../index'
import database from '../../firebase/firebase'

const categoriesModel = {
    activities: [],
    categories: [],
    setCategories: action((state, payload) => {
        state.categories = payload.categories
    }),
    setCategory: action((state, payload) => {
        // payload: {position, day, categoryid}

        state.categories.forEach((category, index) => {
            if (category.position === payload.position && category.day === payload.day) {
                state.categories[index].categoryid = payload.categoryid
                state.categories[index].activityid = ""
            }
        })
    }),
    setActivity: action((state, payload) => {
        state.categories.forEach((category, index) => {
            if (category.position === payload.position && category.day === payload.day) {
                state.categories[index].activityid = payload.activityid
            }
        })
    }),
    syncToDb: thunkOn(
        actions => [actions.categoryDragSet, actions.setCategory, actions.setActivity],
        debounce(
            async function (actions, target) {
                const uid = store.getState().auth.uid // user login id
                const {weekNr, year} = store.getState().settings.currentDate // Get current weeknr and year
                
                const categories = store.getState().activities.categories // all current notes
                
                
                const weekid = await database.ref(`users/${uid}/weekYearTable/${weekNr}_${year}`).once('value') // Fetching weekid value from firebase weekYearTable

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
    /**
     * Updates categories below drag category
     * @param  {number} payload.dragPosition position of the note currently being dragged (drag note)
     * @param  {number} payload.draggedIntoPosition position of the note that was dragged into
     * @param  {string} payload.day day of both note dragged into and drag note
     * @param  {string} payload.dragCategoryid categoryid of the drag note
     * @param  {string} payload.dragActivityid activityid of the drag note
     */
    categoryDragSet: action((state, payload) => {

        const dragPosition = payload.dragPosition
        const draggedIntoPosition = payload.draggedIntoPosition
        const day = payload.day
        const dragCategoryid = payload.dragCategoryid
        const dragActivityid = payload.dragActivityid

        const categoriesToUpdate = [] // categories between drag category and category dragged onto (including)

        if (dragPosition > draggedIntoPosition) { // if dragging upwards
            for (let j = draggedIntoPosition; j < dragPosition; j++) {
                categoriesToUpdate.push(j)
            }
        } else { // if dragging downards
            for (let p = dragPosition + 1; p < draggedIntoPosition + 1; p++) {
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
    }),

    createCategories: action((state, payload) => {
        const categories = []
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        days.forEach((day, index) => {
            for (var i = 1; i < 97; i++) {
                categories.push({
                    day,
                    position: i,
                    activityid: '',
                    categoryid: '',
                    short: '',
                    long: ''
                })
            }
        })
        state.categories = categories
    }),
}

export default categoriesModel