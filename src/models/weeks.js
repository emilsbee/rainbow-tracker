// External imports
import { thunk, action } from "easy-peasy"
import moment from 'moment'

// Internal imports
import database from '../components/firebase/firebase'
import { store } from '../index'
import { indices, days } from '../utils/staticData'


const weeksModel = {
    yearWeeks: [],
    years: [],
    currentWeek: false,
    notes: false,
    indexNotes: false,
    noteIndices: false,
    startWeekListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        var weekid;
        const currentYear = moment().year()
        const currentWeekNr = moment().week()

        switch(payload.type) {
            case 'CURRENT_WEEK':
                var currentWeek = await database.ref(`users/${uid}/yearWeeks/${currentYear}/${currentWeekNr}`).once('value')

                if (currentWeek.val() !== null) {
                    weekid = currentWeek.val()
                } else {
                    actions.newWeek({
                        year: currentYear,
                        weekNr: currentWeekNr
                    })
                    return
                }
                
                break;
            case 'NEXT_WEEK':
                var nextWeekYear = payload.year
                var nextWeekNr = payload.weekNr + 1
                console.log(moment().weeksInYear(nextWeekYear))
                if (payload.weekNr === moment().weeksInYear(nextWeekYear)) {
                    nextWeekYear = payload.year + 1
                    nextWeekNr = 1
                }

                var nextWeek = await database.ref(`users/${uid}/yearWeekNumbers/${nextWeekYear}_${nextWeekNr}`).once('value')
                if (nextWeek.val() !== null) {
                    weekid = nextWeek.val()
                } else {
                    actions.newWeek({
                        year: nextWeekYear,
                        weekNr: nextWeekNr
                    })
                    return
                }
                break;
            case 'SPECIFIC_WEEK':
            
                var specificWeek = await database.ref(`users/${uid}/yearWeeks/${payload.year}/${payload.weekNr}`).once('value')
                if(specificWeek.val() !== null) {
                    weekid = specificWeek.val()
                } else {
                    actions.newWeek({
                        year: payload.year,
                        weekNr: payload.weekNr
                    })
                    return
                }
                break;
            case 'PREVIOUS_WEEK':
                var prevWeekYear = payload.year
                var prevWeekNr = payload.weekNr - 1
                if (payload.weekNr === 1) {
                    prevWeekYear = payload.year-1
                    prevWeekNr = moment().weeksInYear(prevWeekYear)
                } 
                var nextWeek = await database.ref(`users/${uid}/yearWeekNumbers/${prevWeekYear}_${prevWeekNr}`).once('value')  
                if (nextWeek.val() !== null) {
                    weekid = nextWeek.val() 
                    
                } else {
                    actions.newWeek({
                        year: prevWeekYear,
                        weekNr: prevWeekNr
                    })
                    return
                }
                break;
        }

        var weeksRef = database.ref(`users/${uid}/weeks/${weekid}`)
        weeksRef.on('value', function(snapshot) {
            var weekObj = snapshot.val()
            weekObj["weekid"] = snapshot.key
            actions.getNotes({weekid}).then(() => {
    
                actions.setYearWeeks({weeks: moment().weeksInYear(weekObj.year)})
                actions.setWeek(weekObj)
            })

        })
    }),
    stopWeekListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        database.ref(`users/${uid}/weeks/${payload.weekid}`).off()
        actions.setWeek(false)
    }),
    setWeek: action((state, payload) => {
        state.currentWeek = payload
    }),
    newWeek: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        
        const newWeek = await database.ref(`users/${uid}/weeks`).push({
                weekNr: payload.weekNr, 
                year: payload.year, 
                yearWeekNr: `${payload.year}_${payload.weekNr}`
            })

        const weekid = newWeek.key

        var updates = {}
        updates[`users/${uid}/years/${payload.year}`] = true
        updates[`users/${uid}/yearWeeks/${payload.year}/${payload.weekNr}`] = weekid
        updates[`users/${uid}/yearWeekNumbers/${payload.year}_${payload.weekNr}`] = weekid

        for (var day in days) {
            for (var i in indices) {
                var newNoteKey = database.ref().child(`users/${uid}/notes/${weekid}/${days[day]}`).push().key
                updates[`users/${uid}/notes/${weekid}/${days[day]}/${newNoteKey}`] = ""
                updates[`users/${uid}/indexNotes/${weekid}/${days[day]}/${indices[i]}`] = newNoteKey
                var noteIndexObj = {}
                noteIndexObj[indices[i]] = true
                updates[`users/${uid}/noteIndices/${weekid}/${days[day]}/${newNoteKey}`] = noteIndexObj
                updates[`users/${uid}/weeks/${weekid}/days/${days[day]}/${indices[i]}`] = {activity: '', category: ''}
            }
        }

        database.ref().update(updates, function (error) {
            actions.startWeekListener({
                type: 'SPECIFIC_WEEK',
                year: payload.year,
                weekNr: payload.weekNr
            })
        })
    }),
    startYearListener: thunk((actions, payload) => {
        const uid = store.getState().auth.uid

        var yearRef = database.ref(`users/${uid}/years`)
        yearRef.on('value', function(snapshot) {
            var years = snapshot.val()
            var parsedYears = Object.keys(years).map((year) => parseInt(year)).sort((a,b) => b - a)
            actions.setYears(parsedYears)
        }) 
    }),
    stopYearListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        await database.ref(`users/${uid}/years`).off()
        actions.setYears([])
    }),
    setYears: action((state, payload) => {
        state.years = payload
    }),
    setYearWeeks: action((state,payload) => {
        var weeksArr = []
        for (var i = 1; i < payload.weeks+1; i++) {

            weeksArr.push(i)
        }
        
        state.yearWeeks = weeksArr
    }),
    getNotes: thunk( async (actions, payload) => {
        const uid = store.getState().auth.uid

        var notes = await database.ref(`users/${uid}/notes/${payload.weekid}`).once('value')
        var indexNotes = await database.ref(`users/${uid}/indexNotes/${payload.weekid}`).once('value')
        var noteIndices = await database.ref(`users/${uid}/noteIndices/${payload.weekid}`).once('value')
        actions.setNotes({
            type: 'ALL',
            notes: notes.val(),
            indexNotes: indexNotes.val(),
            noteIndices: noteIndices.val()
        })
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
            case 'ALL':
                state.notes = payload.notes
                state.indexNotes = payload.indexNotes
                state.noteIndices = payload.noteIndices
                break;
            default:
                return
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
                    await database.ref().update(updates)
                }
                break;
            case 'ACTIVITY_ONCE':
                await database.ref(`users/${uid}/weeks/${payload.weekid}/days/${payload.day}/${payload.index}/activity`).set(payload.activity)
                break;
            case 'UPDATE_NOTE':
                await database.ref(`users/${uid}/notes/${payload.weekid}/${payload.day}/${payload.noteid}`).set(payload.note)
                break;
            default:
                return
        }
    }),
    updateNotes: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        const indexNotes = store.getState().weeks.indexNotes

        const day = payload.day
        const weekid = payload.weekid

        var indiceObj = {}
        payload.draggedIndices.forEach((index) => {
            indiceObj[index] = true
        })

        var updates = {}
        
        for (var i in payload.draggedIndices) {
            var index = payload.draggedIndices[i]
            updates[`users/${uid}/notes/${weekid}/${day}/${indexNotes[day][index]}`] = payload.note
            updates[`users/${uid}/noteIndices/${weekid}/${day}/${indexNotes[day][index]}`] = indiceObj
        }

        await database.ref().update(updates)
    }),
    deleteNoteStack: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid

        const indexNotes = store.getState().weeks.indexNotes

        const noteIndices = store.getState().weeks.noteIndices
        var indiceGroup = Object.keys(noteIndices[payload.day][payload.noteid])
    
        var updates = {}

        for (var i in indiceGroup) {
            var newObj = {}
            newObj[indiceGroup[i]] = true
            updates[`users/${uid}/noteIndices/${payload.weekid}/${payload.day}/${indexNotes[payload.day][indiceGroup[i]]}`] = newObj
            if (indexNotes[payload.day][indiceGroup[i]] !== payload.noteid) {
                updates[`users/${uid}/notes/${payload.weekid}/${payload.day}/${indexNotes[payload.day][indiceGroup[i]]}`] = ""
            } else if (indexNotes[payload.day][indiceGroup[i]] === payload.noteid) {
                updates[`users/${uid}/notes/${payload.weekid}/${payload.day}/${payload.noteid}`] = payload.note
            }
        }
        
        await database.ref().update(updates)
    }),
    randomThunk: thunk(async (actions, payload) => {
        // const uid = store.getState().auth.uid
        

        // var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        // days.forEach(async(day) => {
        //     var updates = {}
        //     var notes = await database.ref(`users/${uid}/notes/-M6oZ060IUSk8-jKd8MH/${day}`).once("value")
        //     var noteKeys = Object.keys(notes.val())
        //     for (var i = 0; i < 96; i++) {
        //         updates[`users/${uid}/indexNotes/-M6oZ060IUSk8-jKd8MH/${day}/${i}`] = noteKeys[i]
        //         var noteIndiceObj = {}
        //         noteIndiceObj[i] = true
        //         updates[`users/${uid}/noteIndices/-M6oZ060IUSk8-jKd8MH/${day}/${noteKeys[i]}`] = noteIndiceObj
        //     }
        //     await database.ref().update(updates)    
        // })

    })
    
}


export default weeksModel