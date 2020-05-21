export const handleDragEnter = ({
    day,
    draggedNoteDay,
    draggedNoteIndex,
    draggedNoteid,
    index,
    allNoteIndices,
    setHighestIndexDragNote,
    setLowestIndexDragNote,
    setLocalNote,
    setDragIndex,
    setNoteIndices,
    localRect
}) => {
    if (day !== draggedNoteDay) {
        return 
    }
    if (index !== draggedNoteIndex) {
        var maxIndex = Math.max(...Object.keys(allNoteIndices[draggedNoteDay][draggedNoteid]))
        var minIndex = Math.min(...Object.keys(allNoteIndices[draggedNoteDay][draggedNoteid]))

        if (index > maxIndex) {
            setHighestIndexDragNote(localRect)
        } else if (index < minIndex) {
            setLowestIndexDragNote(localRect)
        }

        setLocalNote(false)
        setDragIndex(index)
        
        var newIndicesObj = {}
        var dragKeys = Object.keys(allNoteIndices[draggedNoteDay][draggedNoteid])
        for (var key in dragKeys) {
            newIndicesObj[dragKeys[key]] = true 
        }
        newIndicesObj[index] = true
        allNoteIndices[draggedNoteDay][draggedNoteid] = newIndicesObj
        setNoteIndices(allNoteIndices)
    }

}


export const handleDragEnd = ({
    draggedNoteDay,
    setDraggedNoteDay,
    draggedNoteIndex,
    setDraggedNoteIndex,
    draggedNoteid,
    setDraggedNoteid,
    updateNotes,
    weekid,
    allNoteIndices,
    setHighestIndexDragNote,
    setLowestIndexDragNote
}) => {
    updateNotes({
        draggedIndices: allNoteIndices[draggedNoteDay][draggedNoteid],
        draggedNoteIndex,
        day: draggedNoteDay,
        weekid,
        draggedNoteid
    })
    setDraggedNoteDay('')
    setDraggedNoteIndex('')
    setDraggedNoteid('')
    setHighestIndexDragNote('')
    setLowestIndexDragNote('')
}

export const handleDragStart = ({
    setLowestIndexDragNote,
    setHighestIndexDragNote,
    localRect,
    setLocalNote,
    e,
    setDraggedNoteIndex,
    index,
    setDraggedNoteid,
    noteid,
    setDraggedNoteDay,
    day
    
}) => {
    setLowestIndexDragNote(localRect)
    setHighestIndexDragNote(localRect)
    setLocalNote(false)
    let img = new Image()
    e.dataTransfer.setDragImage(img, 1, 1)
    setDraggedNoteIndex(index)
    setDraggedNoteid(noteid)
    setDraggedNoteDay(day)
}