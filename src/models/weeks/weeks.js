// External imports
import { thunk, action } from "easy-peasy"
import moment from 'moment'


// Internal imports
import database from '../../components/firebase/firebase'
import { store } from '../../index'
import { indices, days } from '../../utils/staticData'

// import { matchColor, weeks2019, weeks2020, dayConversion } from './weeks_utils'

// const data = require('../utils/sorted.json')


const weeksModel = {
    timeHoverIndex: false,
    setTimeHoverIndex: action((state, payload) => {
        state.timeHoverIndex = payload.index
    }),
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
        const currentWeekNr = moment().isoWeek()
        var init = payload.init && true
        switch(payload.type) {
            case 'CURRENT_WEEK':
                var currentWeek = await database.ref(`users/${uid}/yearWeeks/${currentYear}/${currentWeekNr}`).once('value')

                if (currentWeek.val() !== null) {
                    weekid = currentWeek.val()
                    init = true
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
                
                if (payload.weekNr === moment().isoWeeksInYear(nextWeekYear)) {
                    nextWeekYear = payload.year + 1
                    nextWeekNr = 1
                }

                var nextWeek = await database.ref(`users/${uid}/yearWeekNumbers/${nextWeekYear}_${nextWeekNr}`).once('value')
                if (nextWeek.val() !== null) {
                    weekid = nextWeek.val()
                    init = true
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
                    init = true
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
                    prevWeekNr = moment().isoWeeksInYear(prevWeekYear)
                } 
                var prevWeek = await database.ref(`users/${uid}/yearWeekNumbers/${prevWeekYear}_${prevWeekNr}`).once('value')  
                if (prevWeek.val() !== null) {
                    weekid = prevWeek.val() 
                    init = true
                } else {
                    actions.newWeek({
                        year: prevWeekYear,
                        weekNr: prevWeekNr
                    })
                    return
                }
                break;
            default:
                return
        }
        
        var weeksRef = database.ref(`users/${uid}/weeks/${weekid}`)
        weeksRef.on('value', function(snapshot) {
            var weekObj = snapshot.val()

            weekObj["weekid"] = snapshot.key
            if (init) {
                actions.getNotes({weekid: snapshot.key}).then(() => {
                    actions.setYearWeeks({weeks: moment().isoWeeksInYear(weekObj.year)})
                    actions.setWeek(weekObj)
                    init = false
                })
            } else {
                actions.setYearWeeks({weeks: moment().isoWeeksInYear(weekObj.year)})
                actions.setWeek(weekObj)
            }
            
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
                init: true,
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
            if (years && years !== null) {
                var parsedYears = Object.keys(years).map((year) => parseInt(year)).sort((a,b) => b - a)
                actions.setYears(parsedYears)
            } else {
                actions.setYears([])
            }
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
            
                state.noteIndices = payload.noteIndices
                state.indexNotes = payload.indexNotes
                state.notes = payload.notes
                break;
            case 'SPECIAL':
                state.noteIndices[payload.day] = payload.noteIndices
                state.notes[payload.day] = payload.notes                
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
                var notes = store.getState().weeks.notes
                notes[payload.day][payload.noteid] = payload.note
                actions.setNotes({
                    type: 'NOTES',
                    notes
                })
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

        return await database.ref().update(updates)
    }),
    updateNewNotes: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        
        if (uid !== '') {
            var updates = {}
            updates[`users/${uid}/noteIndices/${payload.weekid}/${payload.day}`] = payload.localNoteIndices
            updates[`users/${uid}/notes/${payload.weekid}/${payload.day}`] = payload.localNotes
            await database.ref().update(updates)
        }

    }),
    deleteNoteStack: thunk( (actions, payload) => {
        var noteIndices = store.getState().weeks.noteIndices
        var notes = store.getState().weeks.notes
        var indexNotes = store.getState().weeks.indexNotes
        
        var notesIndices = Object.keys(noteIndices[payload.day][payload.noteid])

        for (var i in notesIndices) {
            var noteid = indexNotes[payload.day][notesIndices[i]]
            
            var indiceObj = {}
            indiceObj[notesIndices[i]] = true
            
            noteIndices[payload.day][noteid] = indiceObj
            
            if (noteid === payload.noteid) {
                notes[payload.day][noteid] = payload.note
            } else {
                notes[payload.day][noteid] = ""
            }
        }
        actions.setNotes({
            type: 'ALL',
            noteIndices,
            notes,
            indexNotes
        })

    }),
    // randomThunk: thunk(async (actions, payload) => {
    //     const uid = store.getState().auth.uid
        
    //     const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        
        
    //     weeks2020.forEach(async(week) => {
    //         var updates = {}

    //         var  weekid = database.ref(`users/${uid}/weeks`).push().key
    //         updates[`users/${uid}/weeks/${weekid}/`] = {
    //             weekNr: week.r,
    //             year: 2020,
    //             yearWeekNr: `2020_${week.r}`
    //         }

    //         await database.ref().update(updates)  

    //         updates = {}
            
    //         updates[`users/${uid}/years/2020`] = true
    //         updates[`users/${uid}/yearWeeks/2020/${week.r}`] = weekid
    //         updates[`users/${uid}/yearWeekNumbers/2020_${week.r}`] = weekid

    //         for (var day in days) {
    //             for (var i in indices) {
    //                 var newNoteKey = database.ref().child(`users/${uid}/notes/${weekid}/${days[day]}`).push().key
                    
    //                 updates[`users/${uid}/notes/${weekid}/${days[day]}/${newNoteKey}`] = data[week.f][dayConversion[days[day]]][indices[i]].note
    //                 updates[`users/${uid}/indexNotes/${weekid}/${days[day]}/${indices[i]}`] = newNoteKey
                    

    //                 updates[`users/${uid}/noteIndices/${weekid}/${days[day]}/${newNoteKey}`] = data[week.f][dayConversion[days[day]]][indices[i]].lines

    //                 var act = data[week.f][dayConversion[days[day]]][indices[i]].activity
    //                 var cat = data[week.f][dayConversion[days[day]]][indices[i]].category
    //                 updates[`users/${uid}/weeks/${weekid}/days/${days[day]}/${indices[i]}`] = {
    //                     activity: matchColor({type: 'ACTIVITY', data: act}),
    //                     category: matchColor({type: 'CATEGORY', data: cat})
    //                 }
                    
    //             }
    //         }
    //         await database.ref().update(updates)  
    //     }) 
    // })
}


export default weeksModel