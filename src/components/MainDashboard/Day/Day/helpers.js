export const findStackExtremes = (notes, stackid) => {
    let maximum;
    let minimum;
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