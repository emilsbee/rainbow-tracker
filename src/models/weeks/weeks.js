// External imports
import { thunk, action,  thunkOn } from "easy-peasy"

// Internal imports


const weeksModel = {
    currentWeekid: "",
    setCurrentWeekid: action((state, payload) => {
        state.currentWeekid = payload.currentWeekid
    })
}


export default weeksModel