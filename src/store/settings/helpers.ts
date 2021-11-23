import * as i from "types";

/**
 * Sorts given category types such that unarchived ones come first and then archived ones.
 * @param categoryTypes
 */
export const sortCategoryTypesByArchived = (categoryTypes: i.CategoryType[]): i.CategoryType[] => {
  const returnArr: i.CategoryType[] = [];
  const archivedArr: i.CategoryType[] = [];

  for (let i = 0; i < categoryTypes.length; i++) {
    if (!categoryTypes[i].archived) {
      returnArr.push(categoryTypes[i]);
    } else {
      archivedArr.push(categoryTypes[i]);
    }
  }

  return returnArr.concat(archivedArr);
};
