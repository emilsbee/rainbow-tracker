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
    setNoteCachedValues: {
        stackid: '', day: '', dragPosition: 0, note: '', position: 0,
    },
    setNote: action((state, payload) => {
        // payload: {stackid, position, day, note, max, min, dragPosition, oldStackid}
        // position: is the position of note dragged onto
        // note: is the note text of drag note
        // max: is the highest value of the drag note which is the lowest in order on screen
        // min: is the lowest value of the drag note which is the highest in order on screen
        // dragPosition: is the position value of drag note
        // oldStackid: the stackid of note being dragged into
        // oldNote: the note text of note being dragged into
    
        
        
        if ( // Checks the current values with cached values and proceeds if they are different
            state.setNoteCachedValues.stackid !== payload.stackid ||
            state.setNoteCachedValues.position !== payload.position ||
            state.setNoteCachedValues.day !== payload.day ||
            state.setNoteCachedValues.note !== payload.note ||
            state.setNoteCachedValues.dragPosition !== payload.dragPosition 
        ) {
            
            // Array for notes that have to be updated
            const notesToUpdate = []
    
            if (payload.position > payload.max+1) { // If the note dragged onto is more than one note lower than the drag note
                
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
            } else if (payload.position < payload.min-1) { // If the note dragged onto is higher than the note just above drag onto
                
                // Finds notes that have to be updated starting from the drag note (not included)
                // and up till the note dragged onto
                for (let j = payload.position; j < payload.dragPosition; j++) {
                    notesToUpdate.push(j)
                }
    
                // Updates notes from notesToUpdate array with the stackid and note of drag note
                state.notes.forEach((note,index) => {
                    if (notesToUpdate.includes(note.position) && note.day === payload.day) {
                        // updateNote(index, payload.stackid, payload.note, note.position)
                        state.notes[index].stackid = payload.stackid // Updates stackid of the note provided

                        // Remove the note text from all other notes from the note stack
                        state.notes.forEach((nt,i) => {
                            if (nt.stackid === payload.stackid && nt.day === payload.day && i !== index) {
                                state.notes[i].note = ""
                            }
                        })
                        state.notes[index].note = payload.note // Update note text to the new note which is above drag note
                        }
                })
                
            } else { // If the note is either just above or just below the drag note
    
                // Finds the note and replaces it with the stackid and note of drag note
                state.notes.forEach((note, index) => {
                    if (note.position === payload.position && note.day === payload.day) {
                    
                        if (payload.position <= payload.dragPosition) { // If the note position value is the same or lower than the drag position (on the screen thiss would mean above drag note)
                            state.notes[index].note = payload.note
                        } 
                        state.notes[index].stackid = payload.stackid 
                        let {min, max} = findStackExtremes(debug(state.notes), payload.oldStackid)
                        if (min !== max) {
                            state.notes.forEach((nt,i) => {
                                if (nt.stackid === payload.oldStackid && nt.day === payload.day && nt.position === min+1) {
                                    state.notes[i].note = payload.oldNote 
                                }
                            })
                        }
                    }
                });
            }
            
            // Sets cached values
            state.setNoteCachedValues.stackid = payload.stackid
            state.setNoteCachedValues.day = payload.day
            state.setNoteCachedValues.dragPosition = payload.dragPosition
            state.setNoteCachedValues.note = payload.note
            state.setNoteCachedValues.position = payload.position
        }
        
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