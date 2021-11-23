import { CategoryType } from "./settings";

/**
 * Sorts given category types such that unarchived ones come first and then archived ones.
 * @param categoryTypes
 */
export const sortCategoryTypesByArchived = (categoryTypes:CategoryType[]):CategoryType[] => {
  const returnArr:CategoryType[] = [];
  const archivedArr:CategoryType[] = [];

  for (let i = 0; i < categoryTypes.length; i++) {
    if (!categoryTypes[i].archived) {
      returnArr.push(categoryTypes[i]);
    } else {
      archivedArr.push(categoryTypes[i]);
    }
  }

  return returnArr.concat(archivedArr);
};
