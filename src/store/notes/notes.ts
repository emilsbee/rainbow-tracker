import * as i from "types";
import { action, debug, thunkOn, TargetPayload } from "easy-peasy";
import { v4 as uuidv4 } from "uuid";
import { debounce } from "debounce";

import { findStackExtremes } from "../../components/MainDashboard/Day/Day/helpers";
import store from "../storeSetup";
import { history } from "../../routers/AppRouter";

const notesModel: i.NotesModel = {
  notes: [],
  setNotes: action((state, payload) => {
    state.notes = payload.notes;
  }),

  syncToDb: thunkOn(
    (actions) => [
      actions.aboveDifference,
      actions.belowDifference,
      actions.deleteNoteStack,
      actions.deleteNoteText,
      actions.setNoteText,
    ],

    debounce(
      async function (actions, target:TargetPayload<{ weekDay:number }>) {
        const userid = store.getState().auth.uid; // User id
        const notes: i.Note[][] = store.getState().notes.notes; // All current week's notes
        const weekDay = target.payload.weekDay;

        try {
          const res = await fetch(`api/user/${userid}/week/${notes[0][0].weekid}/day/${weekDay}/notes `, {
            method: "PATCH",
            mode: "cors",
            credentials: "include",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(notes[weekDay]),
          });

          if (!res.ok) {
            history.push("/internal-error");
          }
        } catch (e) {
          history.push("/internal-error");
        }
      },
      200,
    ),
  ),

  aboveDifferenceCache: { draggedIntoPosition: 0, dragPosition: 0, weekDay: -1, dragStackid: "", dragNoteText: "" },

  aboveDifference: action((state, payload) => {

    // Extract variables from payload
    const draggedIntoPosition = payload.draggedIntoPosition;
    const dragPosition = payload.dragPosition;
    const weekDay = payload.weekDay;
    const dragStackid = payload.dragStackid;
    const dragNoteText = payload.dragNoteText;

    if ( // Compares cache to current values and if they differ then proceed to update the note stack.
      state.aboveDifferenceCache.draggedIntoPosition !== draggedIntoPosition ||
            state.aboveDifferenceCache.dragPosition !== dragPosition ||
            state.aboveDifferenceCache.weekDay !== weekDay ||
            state.aboveDifferenceCache.dragStackid !== dragStackid ||
            state.aboveDifferenceCache.dragNoteText !== dragNoteText
    ) {
      const notesToUpdate = []; // contains the positions of notes to update

      // Finds notes that have to be updated between the drag note (not included)
      // and the note that was dragged onto (included)
      for (let j = draggedIntoPosition; j < dragPosition; j++) {
        notesToUpdate.push(j);
      }

      for (let i = 0; i < state.notes.length; i++) {
        for (let k = 0; k < state.notes[i].length; k++) {
          const note: i.Note = state.notes[i][k];

          if (notesToUpdate.includes(note.notePosition) && note.weekDay === weekDay) { // If current iteration note is one of the notes to update
            state.notes[i][k].stackid = dragStackid; // Updates stackid of the current iteration note to drag note stackid
            state.notes[i][k].note = dragNoteText; // Updates note text of the current iteration note to drag note text

            // Remove the note text from all other notes from the note stack except note that was dragged into
            for (let m = 0; m < state.notes.length; m++) {
              for (let n = 0; n < state.notes[m].length; n++) {
                const noteToRemoveText = state.notes[m][n];

                if (noteToRemoveText.stackid === dragStackid &&
                                    noteToRemoveText.weekDay === weekDay &&
                                    noteToRemoveText.notePosition !== draggedIntoPosition
                ) {
                  state.notes[m][n].note = "";
                }
              }
            }
          }
        }
      }

      // Renew cache
      state.aboveDifferenceCache.draggedIntoPosition = draggedIntoPosition;
      state.aboveDifferenceCache.dragPosition = dragPosition;
      state.aboveDifferenceCache.weekDay = weekDay;
      state.aboveDifferenceCache.dragStackid = dragStackid;
      state.aboveDifferenceCache.dragNoteText = dragNoteText;
    }
  }),

  belowDifferenceCache: { draggedIntoPosition: 0, dragPosition: 0, weekDay: -1, dragStackid: "", oldStackid: "", oldNote: "" },

  belowDifference: action((state, payload) => {

    // Extract variables from payload
    const draggedIntoPosition = payload.draggedIntoPosition;
    const dragPosition = payload.dragPosition;
    const weekDay = payload.weekDay;
    const dragStackid = payload.dragStackid;
    const oldStackid = payload.oldStackid;
    const oldNote = payload.oldNote;

    if ( // Compares cache to current values
      state.belowDifferenceCache.draggedIntoPosition !== draggedIntoPosition ||
            state.belowDifferenceCache.dragPosition !== dragPosition ||
            state.belowDifferenceCache.weekDay !== weekDay ||
            state.belowDifferenceCache.dragStackid !== dragStackid ||
            state.belowDifferenceCache.oldStackid !== oldStackid ||
            state.belowDifferenceCache.oldNote !== oldNote
    ) {
      const notesToUpdate = []; // contains the positions of notes to update

      // Finds notes that have to be updated between the drag note (not included)
      // and the note that was dragged onto (included)
      for (let p = dragPosition + 1; p < draggedIntoPosition + 1; p++) {
        notesToUpdate.push(p);
      }


      for (let i = 0; i < state.notes.length; i++) {
        for (let j = 0; j < state.notes[i].length; j++) {
          const note: i.Note = state.notes[i][j];

          if (notesToUpdate.includes(note.notePosition) && note.weekDay === weekDay) { // If current iteration note is one of the notes to update

            state.notes[i][j].stackid = dragStackid; // Updates stackid of the current iteration note to stackid of drag note

            // Remove the note text from all notes from the note stack except the highest one which is the drag note itself
            for (let m = 0; m < state.notes.length; m++) {
              for (let n = 0; n < state.notes[m].length; n++) {
                const noteToRemoveText = state.notes[m][n];

                if (noteToRemoveText.stackid === dragStackid &&
                                    noteToRemoveText.weekDay === weekDay &&
                                    noteToRemoveText.notePosition !== dragPosition
                ) {
                  state.notes[m][n].note = "";
                }
              }
            }

            const { min, max } = findStackExtremes(state.notes.flat(1), oldStackid); // Finds extremes of the note that was dragged into
            if (min !== max) { // If the note that was dragged into is a stack note

              // Since the note that was dragged into is the topmost note of its stack,
              // it is the only one that contains the stack note text, hence here
              // the stack note text is passed onto the next highest note from the stack.
              for (let p = 0; p < state.notes.length; p++) {
                for (let l = 0; l < state.notes[p].length; l++) {
                  const nt: i.Note = state.notes[p][l];

                  if (nt.stackid === oldStackid && nt.weekDay === weekDay && nt.notePosition === min + 1) {
                    state.notes[p][l].note = oldNote;
                  }
                }
              }
            }
          }
        }
      }
    }

    // Renew cache
    state.belowDifferenceCache.draggedIntoPosition = draggedIntoPosition;
    state.belowDifferenceCache.dragPosition = dragPosition;
    state.belowDifferenceCache.weekDay = weekDay;
    state.belowDifferenceCache.dragStackid = dragStackid;
    state.belowDifferenceCache.oldStackid = oldStackid;
    state.belowDifferenceCache.oldNote = oldNote;
  }),

  setNoteText: action((state, payload) => {
    for (let i = 0; i < state.notes.length; i++) {
      for (let j = 0; j < state.notes[i].length; j++) {
        const note: i.Note = state.notes[i][j];

        if (note.notePosition === payload.notePosition && note.weekDay === payload.weekDay) {
          state.notes[i][j].note = payload.note;
          break;
        }
      }
    }
  }),

  deleteNoteText: action((state, payload) => {
    for (let i = 0; i < state.notes.length; i++) {
      for (let j = 0; j < state.notes[i].length; j++) {
        const note: i.Note =  state.notes[i][j];

        if (note.notePosition === payload.notePosition && note.weekDay === payload.weekDay) {
          state.notes[i][j].note = "";
          break;
        }
      }
    }
  }),

  deleteNoteStack: action((state, payload) => {
    const { min } = findStackExtremes(debug(state.notes.flat(1)), payload.stackid);

    for (let i = 0; i < state.notes.length; i++) {
      for (let j = 0; j < state.notes[i].length; j++) {
        const note: i.Note = state.notes[i][j];

        if (note.stackid === payload.stackid && note.weekDay === payload.weekDay) {
          state.notes[i][j].stackid = uuidv4();

          if (note.notePosition !== min) {
            state.notes[i][j].note = "";
          }
        }
      }
    }
  }),
};

export default notesModel;
