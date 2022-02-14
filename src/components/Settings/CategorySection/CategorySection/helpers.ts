import * as i from 'types';

export const findCategoryForForm = (categoryTypes: i.CategoryType[], selectedCategoryid: string): i.CategoryType => {
  for (let i = 0; i < categoryTypes.length; i++) {
    if (categoryTypes[i].categoryid === selectedCategoryid) {
      return categoryTypes[i];
    }
  }

  return { categoryid: '', userid: '', color: '', name: '', archived: false };
};
