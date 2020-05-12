// External imports
import { thunk, action } from "easy-peasy"


// Internal imports
import database, { firebase, googleAuthProvider } from '../components/firebase/firebase'
import { store } from '../index'
import { timeIntervals } from '../utils/structure'


const weeksModel = {
    currentWeek: false,
    startWeekListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        
        var weeksRef = database.ref(`users/${uid}/weeks/-M6oZ060IUSk8-jKd8MH`)
        weeksRef.on('value', function(snapshot) {
            var weekObj = snapshot.val()
            weekObj["weekid"] = snapshot.key
            actions.setWeek(weekObj)
        })
    }),
    stopWeekListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        database.ref(`users/${uid}/weeks/-M6oZ060IUSk8-jKd8MH`).off()
    }),
    setWeek: action((state, payload) => {
        state.currentWeek = payload
    }),
    updateWeek: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid

        switch(payload.type) {
            case 'CATEGORY_ONCE':
                await database.ref(`users/${uid}/weeks/${payload.weekid}/days/${payload.day}/${payload.index}/category`).set(payload.category)
            case 'CATEGORY_MANY':
                if(payload.draggedCategories) {
                    var updates = {}
                    Object.keys(payload.draggedCategories).forEach((day) => {
                        payload.draggedCategories[day].forEach((index) => {
                            updates[`users/${uid}/weeks/${payload.weekid}/days/${day}/${index}/category`] = payload.category
                        })
                    })
                    return database.ref().update(updates)
                }
        }
    }),
    randomThunk: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        // var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        // day.forEach((day) => {
        //     await database.ref(`users/${uid}/weeks/-M6oZ060IUSk8-jKd8MH/${day}`).set(timeIntervals)
        // })
        
    })
    
}


export default weeksModel