import { action, debug } from 'easy-peasy'
import { v4 as uuidv4 } from 'uuid';
import { findStackExtremes } from '../../components/Day/helpers'

export default {
    notes: [],
    createNotes: action((state, payload) => {
        let notes = []
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        days.forEach((day, index) => {
            for (var i = 1; i < 97; i++) {
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
   

    aboveDifferenceCache: { draggedIntoPosition: 0, dragPosition: 0, day: '', dragStackid: '', dragNoteText: '' },
    aboveDifference: action((state, payload) => {
        // payload = {position, dragPosition, day, stackid, note}

        const draggedIntoPosition = payload.draggedIntoPosition
        const dragPosition = payload.dragPosition
        const day = payload.day
        const dragStackid = payload.dragStackid
        const dragNoteText = payload.dragNoteText 

        if ( // Checks the current values with cached values and proceeds if they are different
            state.aboveDifferenceCache.draggedIntoPosition !== draggedIntoPosition ||
            state.aboveDifferenceCache.dragPosition !== dragPosition ||
            state.aboveDifferenceCache.day !== day ||
            state.aboveDifferenceCache.dragStackid !== dragStackid ||
            state.aboveDifferenceCache.dragNoteText !== dragNoteText
        ) {
            const notesToUpdate = []
    
            // Finds notes that have to be updated between the drag note (not included)
            // and the note that was dragged onto (included)
            for (let j = draggedIntoPosition; j < dragPosition; j++) {
                notesToUpdate.push(j)
            }
            
            // Updates notes from notesToUpdate array with the stackid and note of drag note
            state.notes.forEach((note,index) => {
                if (notesToUpdate.includes(note.position) && note.day === day) {
                    // updateNote(index, payload.stackid, payload.note, note.position)
                    state.notes[index].stackid = dragStackid // Updates stackid of the note provided
    
                    // Remove the note text from all other notes from the note stack
                    state.notes.forEach((nt,i) => {
                        if (nt.stackid === dragStackid && nt.day === day && nt.position !== draggedIntoPosition) {
                            state.notes[i].note = ""
                        }
                    })
                    state.notes[index].note = dragNoteText // Update note text to the new note which is above drag note
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
        //payload = {position, dragPosition, day, stackid, oldStackid, oldNote}
        

        const draggedIntoPosition = payload.position
        const dragPosition = payload.dragPosition
        const day = payload.day
        const dragStackid = payload.stackid
        const oldStackid = payload.oldStackid
        const oldNote = payload.oldNote
        
        if ( // Checks the current values with cached values and proceeds if they are different
            state.aboveDifferenceCache.draggedIntoPosition !== draggedIntoPosition ||
            state.aboveDifferenceCache.dragPosition !== dragPosition ||
            state.aboveDifferenceCache.day !== day ||
            state.aboveDifferenceCache.dragStackid !== dragStackid ||
            state.aboveDifferenceCache.oldStackid !== oldStackid ||
            state.aboveDifferenceCache.oldNote !== oldNote 
        ) {
            const notesToUpdate = []
    
            // Finds notes that have to be updated starting from the drag note (not included)
            // and up till the note dragged onto 
            for (let p = payload.dragPosition + 1; p < payload.position + 1; p++) {
                notesToUpdate.push(p)
            }
            
            // Updates notes from notesToUpdate array with the stackid and note of drag note
            state.notes.forEach((note,index) => {
                if (notesToUpdate.includes(note.position) && note.day === payload.day) {
                    // updateNote(index, payload.stackid, payload.note, note.position)
                    state.notes[index].stackid = payload.stackid // Updates stackid of the note provided
    
                    // Remove the note text from all other notes from the note stack except the highest one
                    state.notes.forEach((nt,i) => {
                        if (nt.stackid === payload.stackid && nt.day === payload.day && nt.position !== payload.dragPosition) {
                            state.notes[i].note = ""
                        }
                    })
                    
                    // // Remove the note text from all other notes from the note stack except the highest one
                    let {min, max} = findStackExtremes(debug(state.notes), payload.oldStackid)
                    if (min !== max) {
                        state.notes.forEach((nt,i) => {
                            if (nt.stackid === payload.oldStackid && nt.day === payload.day && nt.position === min+1) {
                                state.notes[i].note = payload.oldNote 
                            }
                        })
                    }
                }
            })
        }

        // Renew cache
        state.aboveDifferenceCache.draggedIntoPosition = draggedIntoPosition 
        state.aboveDifferenceCache.dragPosition = dragPosition 
        state.aboveDifferenceCache.day = day 
        state.aboveDifferenceCache.dragStackid = dragStackid 
        state.aboveDifferenceCache.oldStackid = oldStackid 
        state.aboveDifferenceCache.oldNote = oldNote 
    }),

    setNoteText: action((state, payload) => {
        // payload: {position, note, day}
        state.notes.forEach((note, index) => {
            if (note.position === payload.position && note.day === payload.day) {
                state.notes[index].note = payload.note 
            }
        });
    }),
    deleteNoteText: action((state, payload) => {
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