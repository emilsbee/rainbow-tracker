/**
 * Checks whether the user is logged in.
 * @param userid for which to check login status.
 */
import {history} from "../../routers/AppRouter";

export const checkIfLoggedIn = async (userid: string):Promise<boolean> => {
    let res;
    try {
        res = await fetch(`${process.env.REACT_APP_HOST}/user/${userid}/auth/is-logged-in`,
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
                history.push("/internalError")
            }

            return false
        }

    } catch (e) {
        history.push("/internalError")
        return false
    }
}