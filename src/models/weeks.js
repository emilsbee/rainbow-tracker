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

        switch(payload.type) {
            case 'LATEST_WEEK':
                if (payload.year) {
                    var latestWeekid = await database.ref(`users/${uid}/yearWeeks/${payload.year}`).orderByKey().limitToLast(1).once('value')
                } else {
                    var latestWeekid = await database.ref(`users/${uid}/yearWeekNumbers`).orderByKey().limitToLast(1).once('value')
                }
                weekid = latestWeekid.val()[Object.keys(latestWeekid.val())]
                break;
            case 'NEXT_WEEK':
                var nextWeek = await database.ref(`users/${uid}/yearWeekNumbers/${payload.year}_${payload.weekNr+1}`).once('value')
                if (nextWeek.val() !== null) {
                    weekid = nextWeek.val()
                } else {
                    weekid = payload.weekid
                }
                break;
            case 'SPECIFIC_WEEK':
                var week = await database.ref(`users/${uid}/yearWeeks/${payload.year}/${payload.weekNr}`).once('value')
                if(week.val() !== null) {
                    weekid = week.val()
                } else {
                    weekid = payload.weekid
                }
                break;
            case 'PREVIOUS_WEEK':
                var nextWeek = await database.ref(`users/${uid}/yearWeekNumbers/${payload.year}_${payload.weekNr-1}`).once('value')  
                if (nextWeek.val() !== null) {
                    weekid = nextWeek.val() 
                    
                } else {
                    weekid = payload.weekid
                }
                break;
        }

        var weeksRef = database.ref(`users/${uid}/weeks/${weekid}`)
        weeksRef.on('value', function(snapshot) {
            var weekObj = snapshot.val()
            weekObj["weekid"] = snapshot.key
            actions.setWeek(weekObj)
            actions.startNoteListeners({weekid: snapshot.key})
        })
    }),
    stopWeekListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        database.ref(`users/${uid}/weeks`).off()
        actions.setWeek(false)
    }),
    setWeek: action((state, payload) => {
        state.currentWeek = payload
    }),
    newWeek: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        var latestWeekInYear = await database.ref(`users/${uid}/yearWeeks/${payload.year}`).orderByKey().limitToLast(1).once('value')
        
        const newWeek = await database.ref(`users/${uid}/weeks`).push({
            weekNr: parseInt(Object.keys(latestWeekInYear.val())[0]) + 1 , 
            year: payload.year, 
            yearWeekNr: `${payload.year}_${parseInt(Object.keys(latestWeekInYear.val())[0]) + 1}`
        })

        const weekid = newWeek.key

        var updates = {}
        updates[`users/${uid}/yearWeekNumbers/${payload.year}_${parseInt(Object.keys(latestWeekInYear.val())[0]) + 1}`] = weekid
        updates[`users/${uid}/yearWeeks/${payload.year}/${parseInt(Object.keys(latestWeekInYear.val())[0]) + 1}`] = weekid
        await database.ref().update(updates)

        for (var day in days) {
            for (var i in indices) {
                var newNoteKey = database.ref().child(`users/${uid}/notes/${weekid}/${days[day]}`).push().key
                updates[`users/${uid}/notes/${weekid}/${days[day]}/${newNoteKey}`] = ""
                updates[`users/${uid}/indexNotes/${weekid}/${days[day]}/${i}`] = newNoteKey
                var noteIndexObj = {}
                noteIndexObj[i] = true
                updates[`users/${uid}/noteIndices/${weekid}/${days[day]}/${newNoteKey}`] = noteIndexObj
                updates[`users/${uid}/weeks/${weekid}/days/${days[day]}/${i}`] = {activity: '', category: ''}
            }
        }
        
        database.ref().update(updates, function(error) {
            if (error) {
                throw error
            } else {

                actions.startWeekListener({type: 'SPECIFIC_WEEK', year: payload.year, weekNr: parseInt(Object.keys(latestWeekInYear.val())[0]) + 1})
            }
        })
    }),
    newYear: thunk(async(actions, payload) => {
        const uid = store.getState().auth.uid

        var latestYear = Math.max(...store.getState().weeks.years)

        const newWeek = await database.ref(`users/${uid}/weeks`).push({
            weekNr: 1, 
            year: latestYear+1, 
            yearWeekNr: `${latestYear+1}_1`
        })

        const weekid = newWeek.key

        var updates = {}
        updates[`users/${uid}/yearWeekNumbers/${latestYear+1}_1`] = weekid
        updates[`users/${uid}/yearWeeks/${latestYear+1}/1`] = weekid
        updates[`users/${uid}/years/${latestYear+1}`] = true
        await database.ref().update(updates)

        for (var day in days) {
            for (var i in indices) {
                var newNoteKey = database.ref().child(`users/${uid}/notes/${weekid}/${days[day]}`).push().key
                updates[`users/${uid}/notes/${weekid}/${days[day]}/${newNoteKey}`] = ""
                updates[`users/${uid}/indexNotes/${weekid}/${days[day]}/${i}`] = newNoteKey
                var noteIndexObj = {}
                noteIndexObj[i] = true
                updates[`users/${uid}/noteIndices/${weekid}/${days[day]}/${newNoteKey}`] = noteIndexObj
                updates[`users/${uid}/weeks/${weekid}/days/${days[day]}/${i}`] = {activity: '', category: ''}
            }
        }
        
        database.ref().update(updates, function(error) {
            if (error) {
                throw error
            } else {

                actions.startWeekListener({type: 'SPECIFIC_WEEK', year: latestYear+1, weekNr: 1})
                actions.startYearWeekListener({year: latestYear+1})
            }
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
    startYearWeekListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid

        var year = payload.year ? payload.year : ''
        
        switch (payload.type) {
            case 'LATEST_YEAR': 
                const latestYear = await database.ref(`users/${uid}/years`).orderByKey().limitToLast(1).once('value')
                year = Object.keys(latestYear.val())[0]
                break;
            
        }
        
        var yearWeekRef = database.ref(`users/${uid}/yearWeeks/${year}`)
        yearWeekRef.on('value', function(snapshot) {
            var yearWeeks = snapshot.val()
            var parsedYearWeeks = Object.keys(yearWeeks).map((yearWeek) => parseInt(yearWeek)).sort((a,b) => b - a)
            actions.setYearWeeks(parsedYearWeeks)
        }) 
    }),
    stopYearWeekListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        await database.ref(`users/${uid}/yearWeeks`).off()
        actions.setYearWeeks([])
    }),
    setYearWeeks: action((state,payload) => {
        state.yearWeeks = payload
    }),
    startNoteListeners: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        
        var notesRef = database.ref(`users/${uid}/notes/${payload.weekid}`)
        notesRef.on('value', function(snapshot) {
            actions.setNotes({
                type: 'NOTES',
                notes: snapshot.val()
            })
        })

        var indexNotesRef = database.ref(`users/${uid}/indexNotes/${payload.weekid}`)
        indexNotesRef.on('value', function(snapshot) {
            actions.setNotes({
                type: 'INDEX_NOTES',
                indexNotes: snapshot.val()
            })
        })
        var noteIndicesRef = database.ref(`users/${uid}/noteIndices/${payload.weekid}`)
        noteIndicesRef.on('value', function(snapshot) {
            actions.setNotes({
                type: 'NOTE_INDICES',
                noteIndices: snapshot.val()
            })
        })
    }),
    stopNoteListeners: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        database.ref(`users/${uid}/notes`).off()
        database.ref(`users/${uid}/indexNotes`).off()
        database.ref(`users/${uid}/noteIndices`).off()
        
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
            default:
                return
        }
    }),
    updateNotes: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid


    }),
    initialiseUser: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid

        const hasData = await database.ref(`users/${uid}/categoryConfigs`).once('value')
        
        if(hasData.val()) {
            return 
        } else {
            const newWeek = await database.ref(`users/${uid}/weeks`).push({weekNr: moment().week(), year: moment().year(), yearWeekNr: `${moment().year}_${moment().week()}`})
            const weekid = newWeek.key
            var updates = {}
            updates[`users/${uid}/years/${moment().year()}`] = true
            updates[`users/${uid}/yearWeeks/${moment().year()}/${moment().week()}`] = weekid
            updates[`users/${uid}/yearWeekNumbers/${moment().year()}_${moment().week()}`] = weekid
            updates[`users/${uid}/activityConfigs`] = {
                havetos: {
                    co: true,
                    d: true,
                    t: true
                },
                leisure: {
                    e: true,
                    m: true,
                    r: true
                },
                work: {
                    ed: true,
                    o: true,
                    pr: true,
                    r: true,
                    ss: true,
                    sw: true
                }
            }
            updates[`users/${uid}/categoryConfigs`] = {
                havetos: "#E9B872",
                leisure: "#BBBE64",
                sleep: "#6494AA",
                work: "#a63d40"
            }

            for (var day in days) {

                for (var i in indices) {
                    var newNoteKey = database.ref().child(`users/${uid}/notes/${weekid}/${days[day]}`).push().key
                    updates[`users/${uid}/notes/${weekid}/${days[day]}/${newNoteKey}`] = ""
                    updates[`users/${uid}/indexNotes/${weekid}/${days[day]}/${i}`] = newNoteKey
                    var noteIndexObj = {}
                    noteIndexObj[i] = true
                    updates[`users/${uid}/noteIndices/${weekid}/${days[day]}/${newNoteKey}`] = noteIndexObj
                    updates[`users/${uid}/weeks/${weekid}/days/${days[day]}/${i}`] = {activity: '', category: ''}
                }
            }
            
            return await database.ref().update(updates)
        }
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