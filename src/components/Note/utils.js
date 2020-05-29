export const localDaySave = ({
    dragNoteObj,
    indexNotes,
    noteIndices,
    notes,
    setLocalNoteIndices,
    setLocalNotes
}) => {
    
    // The data in noteIndices requires indices to be in an object 
    var objectifiedDragIndices = {}
    for (var c in dragNoteObj.indices) {
        objectifiedDragIndices[dragNoteObj.indices[c]] = true
    }

    
    for (var p in dragNoteObj.indices) {
        var noteid = indexNotes[dragNoteObj.indices[p]]
        // Adding the dragNote indice object to each note index in noteIndices
        noteIndices[noteid] = objectifiedDragIndices
        // Adding the dragNote note's text  to each note index in notes
        notes[noteid] = dragNoteObj.note
    }
    setLocalNoteIndices(noteIndices)
    setLocalNotes(notes)
}