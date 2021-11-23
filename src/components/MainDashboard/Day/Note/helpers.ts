// Since the properties exported from constants.scss
// come in the form '20px' as a string with px attached,
// the px has to be removed and string has to be converted
// to an integer to perform math and calculate height.
export const removePX = (str: string): number => {
  return parseInt(str.slice(0, -2));
};

// Calculates the stack height given the position
// of highest and lowest note in the stack, as well
// as the constants for height of one note and the
// bottom margin for one note.
export const getStackHeight = (max: number, min: number, height: string, marginBottom: string): string => {
  return `${((max - min + 1) * removePX(height)) + ((max - min) * removePX(marginBottom))}px`;
};

// These values also have to be changed in the ./Styles.scss file
export const CONSTANTS = {
  NOTE_HEIGHT: "22px",
  NOTE_WIDTH: "115px",
  NOTE_MARGIN_BOTTOM: "2px",
  NOTE_MARGIN_LEFT: "6px",
  NOTE_MARGIN_LEFT_RIGHT: "4px",
  NOTE_BORDER: "#D3D3D3 0.5px solid",
  NOTE_BORDER_RADIUS: "4px",
};

