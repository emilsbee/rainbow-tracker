import { action } from 'easy-peasy'
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
        days.forEach(day => {
            for (var i = 1; i < 97; i++) {
                notes.push({
                    day,
                    position: i,
                    note:'',
                    stackid: uuidv4()
                })
            }
        })
        state.notes = notes
    }),
    setNote: action((state, payload) => {
        // payload: {position, day, stackid, note}
        state.notes.forEach((note, index) => {
            if (note.position === payload.position && note.day === payload.day) {
                state.notes[index].stackid = payload.stackid
                state.notes[index].note = payload.note 
            }
        });
    })
    
}