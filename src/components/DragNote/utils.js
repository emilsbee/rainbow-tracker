export const setTopOffset = ({
    day,
    noteid,
    noteIndices,
    draggedNoteIndex,
    setCurrentTopOffset
}) => {
    var lowestIndex = Math.min(...Object.keys(noteIndices[day][noteid])) 
    var highestIndex = Math.max(...Object.keys(noteIndices[day][noteid]))

    if (lowestIndex === draggedNoteIndex) {
        return setCurrentTopOffset(-11.5)
    } else if (highestIndex === draggedNoteIndex) {
        var leng = Object.keys(noteIndices[day][noteid]).length

        if (leng === 2 ) {
            return setCurrentTopOffset(-38.5)
        } else if (leng > 2) {
            return setCurrentTopOffset(-38.5 + ((leng - 2) * -27))
        }
    } else if (lowestIndex === (draggedNoteIndex-1) && highestIndex === (draggedNoteIndex+1)) {
        return setCurrentTopOffset(-38.5)
    } else  {
        const lessThanDragIndex = Object.keys(noteIndices[day][noteid]).filter(index => index < draggedNoteIndex)
        return  setCurrentTopOffset(-38.5 + ((lessThanDragIndex.length - 1) * -27))
    }
}



export const setHeight = ({
    scrollFlag,
    setScrollFlag,
    currentHeight,
    setCurrentHeight,
    prevHeight,
    setPrevHeight,
    highestIndexDragNote,
    lowestIndexDragNote,
}) => {
    if (scrollFlag) {
        setCurrentHeight(currentHeight+27)
    } else if (!currentHeight && !prevHeight) {
        setCurrentHeight((highestIndexDragNote.bottom - lowestIndexDragNote.top))
    } else if (currentHeight && !prevHeight) {
        setCurrentHeight((highestIndexDragNote.bottom - lowestIndexDragNote.top))
        if (currentHeight- prevHeight !== 27) {
            setScrollFlag(true)
        }
        setPrevHeight(currentHeight)
    } else if (currentHeight && prevHeight) {
        if (currentHeight-prevHeight !== 27) {
            setScrollFlag(true)
        } else {
            setCurrentHeight((highestIndexDragNote.bottom - lowestIndexDragNote.top))
            if (currentHeight- prevHeight !== 27) {
                setScrollFlag(true)
            }
            setPrevHeight(currentHeight)
        }
    }
}
