import {NoteType} from "../../../../store/notes/notes";

/**
 * Finds the top and bottom note's position of a give note stack.
 * @param notes The notes in which to find the min and max.
 * @param stackid The stackid for which to find the min and max.
 */
export const findStackExtremes = (notes:NoteType[], stackid:string):{max:number, min:number} => {
    let maximum:number;
    let minimum:number;
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
                maximum = note.position
                minimum = note.position
                init = false
            } else {
                if (note.position > maximum) {
                    maximum = note.position
                } else if (note.position < minimum) {
                    minimum = note.position
                }
            } 
            
        }
    })

    return {max: maximum, min: minimum}
}