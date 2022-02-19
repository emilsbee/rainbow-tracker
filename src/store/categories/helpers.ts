/**
 * Validates submission of new category. Checks the general string constraints for name and color.
 * Also, validates that all categories in the category setting object have unique names.
 * @param categoryid The categoryid of category to be checked.
 * @param name The name of the category.
 * @param color The color of the category.
 * @return {valid, message} Valid indicates whether input is valid, and message is present if the input is invalid.
 */
export const validateCategorySubmission = (categoryid:string, name:string, color:string):{valid:boolean, message:string} => {
  const returnVal = { valid: true, message: '' };

  if (!name || name.trim().length <= 0 || name.trim().length > 50) {
    returnVal.valid = false;
    returnVal.message = 'You must provide a category name of length 1-50.';
  } else if (!color || color.length <= 0 || color.length > 7 || color[0] !== '#') {
    returnVal.valid = false;
    returnVal.message = 'You must provide a valid hex color value.';
  }

  return returnVal;
};
