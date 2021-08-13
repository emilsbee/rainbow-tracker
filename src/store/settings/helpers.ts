// Internal imports
import {ActivityType, CategoryType} from "./settings";

/**
 * Fetches all category and activity types for a user.
 * @param userid of the user for which to fetch the category types full.
 */
export const getCategoryTypesFull = async (userid: string):Promise<{activityTypes: ActivityType[], categoryTypes: CategoryType[]}[]> => {
    let res = await fetch(`${process.env.REACT_APP_HOST}/user/${userid}/category-types-full`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
    })

    if (!res.ok) {
        alert("Failed to fetch category types full.")
    }

    return  await res.json() as {activityTypes: ActivityType[], categoryTypes: CategoryType[]}[]
}