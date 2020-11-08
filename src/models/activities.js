import { action } from 'easy-peasy'

export default {
    activities: [],
    categories: [],
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