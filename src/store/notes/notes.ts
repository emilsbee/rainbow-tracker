// External imports
import {Action, action, debug, ThunkOn, thunkOn, TargetPayload} from 'easy-peasy'
import { v4 as uuidv4 } from 'uuid';
import { debounce } from "debounce";

// Internal imports
import { findStackExtremes } from '../../components/MainDashboard/Day/Day/helpers'
import store from '../storeSetup'
import database from '../../firebase/firebase'

export interface NoteType {
    day:string,
    position:number,
    note:string,
    stackid:string
}

export interface NotesModel {
    notes:NoteType[],
    setNotes: Action<NotesModel,{notes:NoteType[]}>,
    createNotes: Action<NotesModel>,
    syncToDb: ThunkOn<NotesModel>,

    // Cache values for above difference action
    aboveDifferenceCache: { draggedIntoPosition:number, dragPosition:number, day:string, dragStackid:string, dragNoteText:string },

    /**
     * Updates notes above the drag note.
     * @param  draggedIntoPosition The position of the note that was dragged into.
     * @param  dragPosition The position of the note currently being dragged (drag note).
     * @param  day The day of both note dragged into and drag note.
     * @param  dragStackid The stackid of the drag note.
     * @param  dragNoteText The note text of the drag note.
     */
    aboveDifference: Action<NotesModel, {draggedIntoPosition:number, dragPosition:number, day:string, dragStackid:string, dragNoteText:string}>,

    // Cache values for belowDifference action
    belowDifferenceCache: { draggedIntoPosition:number, dragPosition:number, day:string, dragStackid:string, oldStackid:string, oldNote:string},
    /**
     * Updates notes below the drag note.
     * @param  draggedIntoPosition The position of the note that was dragged into.
     * @param  dragPosition The position of the note currently being dragged (drag note).
     * @param  day Day of both note dragged into and drag note.
     * @param  dragStackid The stackid of the drag note.
     * @param  oldStackid The stackid of note that was dragged into.
     * @param  oldNote The note text of note that was dragged into.
     */
    belowDifference: Action<NotesModel, {draggedIntoPosition:number, dragPosition:number, day:string, dragStackid:string, oldStackid:string, oldNote:string }>,

    setNoteText: Action<NotesModel, NoteType>,
    deleteNoteText: Action<NotesModel, NoteType>,
    deleteNoteStack: Action<NotesModel, {stackid:string, day:string}>
}

const notesModel:NotesModel = {
    notes: [],
    setNotes: action((state, payload) => {
        state.notes= payload.notes
    }),
    createNotes: action((state, payload) => {
        const notes = []
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        days.forEach(day => {
            for (let i = 1; i < 97; i++) {
                notes.push({
                    day,
                    position: i,
                    note:'',
                    stackid: uuidv4(),
                })
            }
        })
        state.notes = notes
    }),
   
    syncToDb: thunkOn(
        actions => [
            actions.aboveDifference,
            actions.belowDifference,
            actions.deleteNoteStack,
            actions.deleteNoteText,
            actions.setNoteText
        ],

        debounce(
            async function(actions, target:TargetPayload<{ day:string }>) {
                const uid = store.getState().auth.uid // User id
                const {weekNr, year} = store.getState().settings.currentDate // Current store weekNr and year
                const notes = store.getState().notes.notes // All current week's notes

                const weekid = await database.ref(`users/${uid}/weekYearTable/${weekNr}_${year}`).once('value') // Fetching weekid value from Firebase weekYearTable

                const updates = {}
                // Updates notes from the day that was dragged or updated in terms of text or 
                //deleting stack, etc.
                notes.forEach((note, index) => {
                    if (note.day === target.payload.day) {
                        updates[`users/${uid}/notes/${weekid.val()}/${index}`] = note
                    }
                })
                
                await database.ref().update(updates)
            }, 
            200
        ) 
    ),

    aboveDifferenceCache: { draggedIntoPosition: 0, dragPosition: 0, day: '', dragStackid: '', dragNoteText: '' },

    aboveDifference: action((state, payload) => {

        // Extract variables from payload
        const draggedIntoPosition = payload.draggedIntoPosition
        const dragPosition = payload.dragPosition
        const day = payload.day
        const dragStackid = payload.dragStackid
        const dragNoteText = payload.dragNoteText 

        if ( // Compares cache to current values and if they differ then proceed to update the note stack.
            state.aboveDifferenceCache.draggedIntoPosition !== draggedIntoPosition ||
            state.aboveDifferenceCache.dragPosition !== dragPosition ||
            state.aboveDifferenceCache.day !== day ||
            state.aboveDifferenceCache.dragStackid !== dragStackid ||
            state.aboveDifferenceCache.dragNoteText !== dragNoteText
        ) {
            const notesToUpdate = [] // contains the positions of notes to update
    
            // Finds notes that have to be updated between the drag note (not included)
            // and the note that was dragged onto (included)
            for (let j = draggedIntoPosition; j < dragPosition; j++) {
                notesToUpdate.push(j)
            }
            
        
            state.notes.forEach((note,index) => { // Iterates overal all notes

                if (notesToUpdate.includes(note.position) && note.day === day) { // If current iteration note is one of the notes to update
                    
                    state.notes[index].stackid = dragStackid // Updates stackid of the current iteration note to drag note stackid
                    state.notes[index].note = dragNoteText // Updates note text of the current iteration note to drag note text
    
                    // Remove the note text from all other notes from the note stack except note that was dragged into
                    state.notes.forEach((nt,i) => {
                        if (nt.stackid === dragStackid && nt.day === day && nt.position !== draggedIntoPosition) { 
                            state.notes[i].note = ""
                        }
                    })
                    
                }
            })

            // Renew cache
            state.aboveDifferenceCache.draggedIntoPosition = draggedIntoPosition 
            state.aboveDifferenceCache.dragPosition = dragPosition 
            state.aboveDifferenceCache.day = day 
            state.aboveDifferenceCache.dragStackid = dragStackid 
            state.aboveDifferenceCache.dragNoteText = dragNoteText
        }
    }),

    belowDifferenceCache: { draggedIntoPosition: 0, dragPosition: 0, day: '', dragStackid: '', oldStackid: '', oldNote: ''},

    belowDifference: action((state, payload) => {
        
        // Extract variables from payload
        const draggedIntoPosition = payload.draggedIntoPosition
        const dragPosition = payload.dragPosition
        const day = payload.day
        const dragStackid = payload.dragStackid
        const oldStackid = payload.oldStackid
        const oldNote = payload.oldNote
        
        if ( // Compares cache to current values
            state.belowDifferenceCache.draggedIntoPosition !== draggedIntoPosition ||
            state.belowDifferenceCache.dragPosition !== dragPosition ||
            state.belowDifferenceCache.day !== day ||
            state.belowDifferenceCache.dragStackid !== dragStackid ||
            state.belowDifferenceCache.oldStackid !== oldStackid ||
            state.belowDifferenceCache.oldNote !== oldNote
        ) {
            const notesToUpdate = [] // contains the positions of notes to update
    
            // Finds notes that have to be updated between the drag note (not included)
            // and the note that was dragged onto (included)
            for (let p = dragPosition + 1; p < draggedIntoPosition + 1; p++) {
                notesToUpdate.push(p)
            }
            
            
            state.notes.forEach((note,index) => { // Iterates overal all notes

                if (notesToUpdate.includes(note.position) && note.day === day) {  // If current iteration note is one of the notes to update

                    state.notes[index].stackid = dragStackid // Updates stackid of the current iteration note to stackid of drag note

    
                    // Remove the note text from all notes from the note stack except the highest one which is the drag note itself
                    state.notes.forEach((nt,i) => {
                        if (nt.stackid === dragStackid && nt.day === day && nt.position !== dragPosition) {
                            state.notes[i].note = ""
                        }
                    })
                    
                    
                    let {min, max} = findStackExtremes(debug(state.notes), oldStackid) // Finds extremes of the note that was dragged into 
                    if (min !== max) { // If the note that was dragged into is a stack note

                        // Since the note that was dragged into is the topmost note of its stack,
                        // it is the only one that contains the stack note text, hence here
                        // the stack note text is passed onto the next highest note from the stack.
                        state.notes.forEach((nt,i) => {
                            if (nt.stackid === oldStackid && nt.day === day && nt.position === min+1) {
                                state.notes[i].note = oldNote 
                            }
                        })
                    }
                }
            })
        }

        // Renew cache
        state.belowDifferenceCache.draggedIntoPosition = draggedIntoPosition
        state.belowDifferenceCache.dragPosition = dragPosition
        state.belowDifferenceCache.day = day
        state.belowDifferenceCache.dragStackid = dragStackid
        state.belowDifferenceCache.oldStackid = oldStackid
        state.belowDifferenceCache.oldNote = oldNote
    }),

    setNoteText: action((state, payload) => {
        // payload {position, note, day}
        state.notes.forEach((note, index) => {
            if (note.position === payload.position && note.day === payload.day) {
                state.notes[index].note = payload.note 
            }
        });
    }),

    deleteNoteText: action((state, payload) => {
        // payload = {position, day}
        state.notes.forEach((note, index) => {
            if (note.position === payload.position && note.day === payload.day) {
                state.notes[index].note = ""
            }
        });
    }),

    deleteNoteStack: action((state, payload) => {
        const {min} = findStackExtremes(debug(state.notes), payload.stackid)
        state.notes.forEach((note, index) => {
            if (note.stackid === payload.stackid && note.day === payload.day) {
                state.notes[index].stackid = uuidv4()
                if (note.position !== min) {
                    state.notes[index].note = ""
                } 
            }
        });
    })
}

export default notesModel