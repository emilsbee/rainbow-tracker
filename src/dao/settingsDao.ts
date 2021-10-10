// Internal imports
import {ActivityType, CategoryType} from "../store/settings/settings";
import {history} from "../routers/AppRouter";

/**
 * Restore given activity type.
 * @param userid
 * @param activityid
 */
export const restoreActivityType = async (userid: string, activityid: string):Promise<boolean> => {
    try {
        let success = true

        const res = await fetch(`api/user/${userid}/activity-type/restore/${activityid}`, {
            method: "PATCH",
            mode: "cors",
            credentials: "include"
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
 * Archive given activity type.
 * @param userid
 * @param activityid
 */
export const archiveActivityType = async (userid: string, activityid: string):Promise<boolean> => {
    try {
        let success = true

        let res = await fetch(`api/user/${userid}/activity-type/${activityid}`, {
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
 * Restores a category type and its activities from being archived.
 * @param userid
 * @param categoryid
 */
export const restoreCategoryType = async (userid: string, categoryid: string):Promise<boolean> => {
    try {
        let success = true

        let res = await fetch(`api/user/${userid}/category-type/restore/${categoryid}`, {
            method: "PATCH",
            mode: "cors",
            credentials: "include"
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
 * Deletes a category type.
 * @param userid
 * @param categoryid
 */
export const archiveCategory = async (userid:string, categoryid:string):Promise<boolean> => {
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