// Since the properties exported from constants.scss
// come in the form '20px' as a string with px attached,
// the px has to be removed and string has to be converted
// to an integer to perform math and calculate height.
export const removePX = (str) => {
    return parseInt(str.slice(0,-2))
}

// Calculates the stack height given the position 
// of highest and lowest note in the stack, as well
// as the constants for height of one note and the 
// bottom margin for one note.
export const getStackHeight = (max, min, height, marginBottom) => {
    return `${((max-min+1)*removePX(height))+((max-min)*removePX(marginBottom))}px`
}