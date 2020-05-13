// External imports
import { thunk, action } from "easy-peasy"


// Internal imports
import database, { firebase, googleAuthProvider } from '../components/firebase/firebase'
import { store } from '../index'
import { timeIntervals } from '../utils/structure'


const weeksModel = {
    currentWeek: false,
    notes: {},
    indexNotes: {},
    noteIndices: {},
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
    startNoteListeners: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid

        var notesRef = database.ref(`users/${uid}/notes/-M6oZ060IUSk8-jKd8MH`)
        notesRef.on('value', function(snapshot) {
            actions.setNotes({
                type: 'NOTES',
                notes: snapshot.val()
            })
        })

        var indexNotesRef = database.ref(`users/${uid}/indexNotes/-M6oZ060IUSk8-jKd8MH`)
        indexNotesRef.on('value', function(snapshot) {
            actions.setNotes({
                type: 'INDEX_NOTES',
                indexNotes: snapshot.val()
            })
        })

        var noteIndicesRef = database.ref(`users/${uid}/noteIndices/-M6oZ060IUSk8-jKd8MH`)
        noteIndicesRef.on('value', function(snapshot) {
            actions.setNotes({
                type: 'NOTE_INDICES',
                noteIndices: snapshot.val()
            })
        })
    }),
    stopNoteListeners: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        database.ref(`users/${uid}/notes/-M6oZ060IUSk8-jKd8MH`).off()
        
    }),
    setNotes: action((state, payload) => {
        switch(payload.type) {
            case 'NOTES': 
                state.notes = payload.notes
                break;
            case 'INDEX_NOTES': 
                state.indexNotes = payload.indexNotes
                break;
            case 'NOTE_INDICES': 
                state.noteIndices = payload.noteIndices
                break;
        }
    }),
    updateWeek: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid

        switch(payload.type) {
            case 'CATEGORY_ONCE':
                var onceUpdates = {}
                onceUpdates[`users/${uid}/weeks/${payload.weekid}/days/${payload.day}/${payload.index}/category`] = payload.category
                onceUpdates[`users/${uid}/weeks/${payload.weekid}/days/${payload.day}/${payload.index}/activity`] = ''
                await database.ref().update(onceUpdates)
                break;
            case 'CATEGORY_MANY':
                if(payload.draggedCategories) {
                    var updates = {}
                    Object.keys(payload.draggedCategories).forEach((day) => {
                        payload.draggedCategories[day].forEach((index) => {
                            updates[`users/${uid}/weeks/${payload.weekid}/days/${day}/${index}/category`] = payload.category
                            updates[`users/${uid}/weeks/${payload.weekid}/days/${day}/${index}/activity`] = payload.activity
                        })
                    })
                    return database.ref().update(updates)
                }
                break;
            case 'ACTIVITY_ONCE':
                await database.ref(`users/${uid}/weeks/${payload.weekid}/days/${payload.day}/${payload.index}/activity`).set(payload.activity)
                break;

        }
    }),
    updateNotes: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid


    }),
    randomThunk: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        

        var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        days.forEach(async(day) => {
            var updates = {}
            var notes = await database.ref(`users/${uid}/notes/-M6oZ060IUSk8-jKd8MH/${day}`).once("value")
            var noteKeys = Object.keys(notes.val())
            for (var i = 0; i < 96; i++) {
                updates[`users/${uid}/indexNotes/-M6oZ060IUSk8-jKd8MH/${day}/${i}`] = noteKeys[i]
                var noteIndiceObj = {}
                noteIndiceObj[i] = true
                updates[`users/${uid}/noteIndices/-M6oZ060IUSk8-jKd8MH/${day}/${noteKeys[i]}`] = noteIndiceObj
            }
            await database.ref().update(updates)    
        })

    })
    
}


export default weeksModel