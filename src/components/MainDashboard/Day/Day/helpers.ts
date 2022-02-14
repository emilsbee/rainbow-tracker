import * as i from 'types';

/**
 * Finds the top and bottom note's position of a give note stack.
 * @param notes The notes in which to find the min and max.
 * @param stackid The stackid for which to find the min and max.
 */
export const findStackExtremes = (notes: i.Note[], stackid:string):{max:number, min:number} => {
  let max = -1;
  let min = -1;
  let init = true;

  // This function iterates over all notes. If a note has a property stackid that
  // matches the argument stackid, it initialises the maximum and minimum variables.
  // Every consequent iteration that matches the stackid will compare the current
  // maximum and minimum to the current note. Then change the maximum or minimum
  // if the current note is higher or lower than the current maximum or minimum.
  // It assumes that the notes definitely contain at least two notes with the same
  // stackid as provided.
  notes.forEach((note, index) => {
    if (note.stackid === stackid) {
      if (init) {
        max = note.notePosition;
        min = note.notePosition;
        init = false;
      } else {
        if (note.notePosition > max) {
          max = note.notePosition;
        } else if (note.notePosition < min) {
          min = note.notePosition;
        }
      }

    }
  });

  // if (max === -1 || min === -1) {
  //     alert("Note stack extremes are bad.")
  // }

  return { max, min };
};
