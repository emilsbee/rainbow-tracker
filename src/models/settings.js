// External imports
import { thunk, action } from "easy-peasy"


// Internal imports


const settingsModel = {
    activitySettings: null,
    categorySettings: null,
    
    setActivitySettings: action((state, payload) => {
        state.activitySettings = payload.activitySettings
    }),

    setCategorySettings: action((state, payload) => {
        state.categorySettings = payload.categorySettings
    }),

    currentDate: {
        weekNr: 0,
        year: 0
    },
    setDate: action((state, payload) => {
        state.currentDate = payload.date
    })
}


export default settingsModel