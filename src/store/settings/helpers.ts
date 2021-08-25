// Internal imports
import {ActivityType, CategoryType} from "./settings";
import {history} from "../../routers/AppRouter";

/**
 * Fetches all category and activity types for a user.
 * @param userid of the user for which to fetch the category types full.
 */
export const getCategoryTypesFull = async (userid: string):Promise<{activityTypes: ActivityType[], categoryTypes: CategoryType[]}[]> => {
    try {
        let res = await fetch(`api/user/${userid}/category-types-full`, {
            method: "GET",
            mode: "cors",
            credentials: "include",
        })

        if (!res.ok) {
            history.push("/internalError")
        }

        return  await res.json() as {activityTypes: ActivityType[], categoryTypes: CategoryType[]}[]
    } catch (e) {
        history.push("/internalError")
        return []
    }
}