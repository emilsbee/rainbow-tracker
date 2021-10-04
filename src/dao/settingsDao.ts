// Internal imports
import {ActivityType, CategoryType} from "../store/settings/settings";
import {history} from "../routers/AppRouter";

/**
 * Deletes a category type.
 * @param userid
 * @param categoryid
 */
export const deleteCategory = async (userid:string, categoryid:string):Promise<boolean> => {
    try {
        let success = true

        let res = await fetch(`api/user/${userid}/category-type/${categoryid}`, {
            method: "DELETE",
            mode: "cors",
            credentials: "include",
        })

        if (res.status === 401) {
            history.push("/login")
            success = false
        } else if (!res.ok) {
            history.push("/internalError")
            success = false
        }

        return success
    } catch (e) {
        history.push("/internalError")
        return false
    }
}

/**
 * Creates a new category type.
 * @param userid
 * @param name
 * @param color
 */
export const createCategory = async (userid:string, name:string, color:string):Promise<CategoryType> => {

    try {
        let res = await fetch(`api/user/${userid}/category-types`, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({
                color,
                name
            })
        })

        if (res.status === 401) {
            history.push("/login")
        } else if (!res.ok) {
            history.push("/internalError")
        }

        return await res.json() as unknown as CategoryType
    } catch (e) {
        history.push("/internalError")
        return {} as CategoryType
    }
}

/**
 * Fetches all category and activity types for a user.
 * @param userid of the user for which to fetch the category types full.
 */
export const getCategoryTypesFull = async (userid: string):Promise<{activityTypes: ActivityType[], categoryTypes: CategoryType[]}> => {
    try {
        let res = await fetch(`api/user/${userid}/category-types-full`, {
            method: "GET",
            mode: "cors",
            credentials: "include",
        })

        if (res.status === 401) {
            history.push("/login")
        } else if (!res.ok) {
            history.push("/internalError")
        }

        return  await res.json() as {activityTypes: ActivityType[], categoryTypes: CategoryType[]}
    } catch (e) {
        history.push("/internalError")
        return {categoryTypes: [], activityTypes: []}
    }
}