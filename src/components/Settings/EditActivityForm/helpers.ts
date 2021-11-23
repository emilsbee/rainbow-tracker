// Internal imports
import { ActivityType, CategoryType } from "../../../store/settings/settings";

export const checkIfCategoryExists = (categoryTypes:CategoryType[], categoryid: string): { exists: boolean, categoryType:CategoryType } => {
  let exists = false;
  let categoryType = {} as CategoryType;

  for (let i = 0; i < categoryTypes.length; i++) {
    if (categoryTypes[i].categoryid === categoryid) {
      exists = true;
      categoryType = categoryTypes[i];
      break;
    }
  }

  return { exists, categoryType };
};

export const checkIfActivityExists = (activityTypes: ActivityType[], activityid: string): { exists: boolean, activityType: ActivityType } => {
  let exists = false;
  let activityType = {} as ActivityType;

  for (let i = 0; i < activityTypes.length; i++) {
    if (activityTypes[i].activityid === activityid) {
      exists = true;
      activityType = activityTypes[i];
      break;
    }
  }

  return { exists, activityType };
};

/**
 * Validates submission of new activity. Checks the general string constraints for long name and short name.
 * @param long The long name of activity.
 * @param short The short name of activity.
 * @return {valid, message} Valid indicates whether input is valid, and message is present if the input is invalid.
 */
export const validateActivitySubmission = (long:string, short:string):{valid:boolean, message:string} => {
  const returnVal = { valid: true, message: "" };

  if (!long || long.trim().length <= 0 || long.trim().length > 100) {
    returnVal.valid = false;
    returnVal.message = "Activity long name must be of length 1-18.";
  } else if (!short || short.length <= 0 || short.length > 2) {
    returnVal.valid = false;
    returnVal.message = "Activity short name must be of length 1-2.";
  }
  return returnVal;
};
