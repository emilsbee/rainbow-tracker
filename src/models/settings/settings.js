// External imports
import { thunk, action } from "easy-peasy"


// Internal imports


const settingsModel = {
    connectionErorr: false,
    setConnectionError: action((state, payload) => {
        state.connectionErorr = payload.connectionErorr
    }),
    timeHoverIndex: false,
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
        weekNr: 0,
        year: 0
    },
    setDate: action((state, payload) => {
        state.currentDate = payload.date
    })
}


export default settingsModel