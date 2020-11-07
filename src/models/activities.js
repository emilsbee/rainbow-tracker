import { action, debug } from 'easy-peasy'
import { v4 as uuidv4 } from 'uuid';

export default {
    activities: [
        {
            day: 'Monday',
            position: 1,
            color: 'black',
        },
        {
            day: 'Monday',
            position: 2,
            color: 'black'
        },
        {
            day: 'Monday',
            position: 3,
            color: 'black'
        },
        {
            day: 'Monday',
            position: 4,
            color: 'black'
        },
        {
            day: 'Monday',
            position: 5,
            color: 'black'
        },
        {
            day: 'Monday',
            position: 6,
            color: 'black'
        },
        {
            day: 'Monday',
            position: 7,
            color: 'black'
        },
        {
            day: 'Monday',
            position: 8,
            color: 'black'
        },
        {
            day: 'Monday',
            position: 9,
            color: 'black'
        },
        {
            day: 'Monday',
            position: 10,
            color: 'black'
        },
        {
            day: 'Monday',
            position: 11,
            color: 'black',
        },
        {
            day: 'Monday',
            position: 12,
            color: 'black'
        },
        {
            day: 'Monday',
            position: 13,
            color: 'black'
        },
        {
            day: 'Monday',
            position: 14,
            color: 'black'
        },
        {
            day: 'Monday',
            position: 15,
            color: 'black'
        },
        {
            day: 'Monday',
            position: 16,
            color: 'black'
        },
        {
            day: 'Monday',
            position: 17,
            color: 'black'
        },
        {
            day: 'Monday',
            position: 18,
            color: 'black'
        },
        {
            day: 'Monday',
            position: 19,
            color: 'black'
        },
        {
            day: 'Monday',
            position: 20,
            color: 'black'
        },
        {
            day: 'Tuesday',
            position: 1,
            color: 'black',
        },
        {
            day: 'Tuesday',
            position: 2,
            color: 'black'
        },
        {
            day: 'Tuesday',
            position: 3,
            color: 'black'
        },
        {
            day: 'Tuesday',
            position: 4,
            color: 'black'
        },
        {
            day: 'Tuesday',
            position: 5,
            color: 'black'
        },
        {
            day: 'Tuesday',
            position: 6,
            color: 'black'
        },
        {
            day: 'Tuesday',
            position: 7,
            color: 'black'
        },
        {
            day: 'Tuesday',
            position: 8,
            color: 'black'
        },
        {
            day: 'Tuesday',
            position: 9,
            color: 'black'
        },
        {
            day: 'Tuesday',
            position: 10,
            color: 'black'
        },
        {
            day: 'Tuesday',
            position: 11,
            color: 'black',
        },
        {
            day: 'Tuesday',
            position: 12,
            color: 'black'
        },
        {
            day: 'Tuesday',
            position: 13,
            color: 'black'
        },
        {
            day: 'Tuesday',
            position: 14,
            color: 'black'
        },
        {
            day: 'Tuesday',
            position: 15,
            color: 'black'
        },
        {
            day: 'Tuesday',
            position: 16,
            color: 'black'
        },
        {
            day: 'Tuesday',
            position: 17,
            color: 'black'
        },
        {
            day: 'Tuesday',
            position: 18,
            color: 'black'
        },
        {
            day: 'Tuesday',
            position: 19,
            color: 'black'
        },
        {
            day: 'Tuesday',
            position: 20,
            color: 'black'
        },
    ],
    setActivity: action((state, payload) => {
        // payload: {activity}
        state.activities.forEach((activity, index) => {
            if (activity.position === payload.activity.position && activity.day === payload.activity.day) {
                state.activities[index].color = 'red' 
            }
        });
    }),
        
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
        // payload: {stackid, position, day, note, max, min, dragPosition}
        // position: is the position of note dragged onto
        // note: is the note text of drag note
        // max: is the highest value of the drag note which is the lowest in order on screen
        // min: is the lowest value of the drag note which is the highest in order on screen
        // dragPosition: is the position value of drag note
        
        
        if ( // Checks the current values with cached values and proceeds if they are different
            state.setNoteCachedValues.stackid !== payload.stackid ||
            state.setNoteCachedValues.position !== payload.position ||
            state.setNoteCachedValues.day !== payload.day ||
            state.setNoteCachedValues.note !== payload.note ||
            state.setNoteCachedValues.dragPosition !== payload.dragPosition 
        ) {
            // Updates a note's stackid and the note text
            const updateNote = (index, stackid, note) => {
                state.notes[index].stackid = stackid
                state.notes[index].note = note 
            }
    
            // Array for notes that have to be updated
            const notesToUpdate = []
    
            if (payload.position > payload.max+1) { // If the not dragged onto is lower than the note just below drag note
    
                // Finds notes that have to be updated starting from the note dragged onto  
                // and up till the drag note (not included)
                for (let p = payload.dragPosition + 1; p < payload.position + 1; p++) {
                    notesToUpdate.push(p)
                }
                
                // Updates notes from notesToUpdate array with the stackid and note of drag note
                state.notes.forEach((note,index) => {
                    if (notesToUpdate.includes(note.position) && note.day === payload.day) {
                        updateNote(index, payload.stackid, payload.note)
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
                        updateNote(index, payload.stackid, payload.note)
                    }
                })
                
            } else { // If the note is either just above or just below the drag note
    
                // Finds the note and replaces it with the stackid and note of drag note
                state.notes.forEach((note, index) => {
                    if (note.position === payload.position && note.day === payload.day) {
                        updateNote(index, payload.stackid, payload.note) 
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
       


    })
    
}