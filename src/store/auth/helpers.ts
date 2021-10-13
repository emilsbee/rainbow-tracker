import {history} from "../../routers/AppRouter";

/**
 * Checks whether the user is logged in.
 * @param userid for which to check login status.
 */
export const checkIfLoggedIn = async (userid: string):Promise<boolean> => {
    let res;
    try {
        res = await fetch(`api/user/${userid}/auth/is-logged-in`,
            {
                method: "GET",
                mode: "cors",
                credentials: "include",
            }
        )

        if (res.ok) {
            return res.ok
        } else {
            if (res.status !== 401) {
                history.push("/internal-error")
            }

            return false
        }

    } catch (e) {
        history.push("/internal-error")
        return false
    }
}

