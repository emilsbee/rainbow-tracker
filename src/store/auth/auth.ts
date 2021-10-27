// External imports
import {thunk, action, Thunk, Action} from "easy-peasy"

// Internal imports
import {history} from "../../routers/AppRouter";

export type User = {
    userid:string
    email:string
}

/**
 * Authentication model. Stores state and functionality to change it
 * related to user authentication.
 */
export interface AuthModel {
    // User id, if present indicates that user has logged in.
    uid:string,

    /**
     * Performs login with the given email and password.
     */
    login: Thunk<AuthModel, {email:string, password:string}>,
    /**
     * Sets the user as logged in.
     */
    setuid: Action<AuthModel, {userid:string}>,
    /**
     * Performs logout.
     */
    logout: Thunk<AuthModel, {userid:string}>,
}

const authModel:AuthModel = {
    uid: "",

    login: thunk(async (actions, payload) => {
        const res = await fetch(`/api/auth/login`, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: payload.email, password: payload.password})
        })

        if (res.ok) {
            let user = await res.json() as User
            window.localStorage.setItem("userid", user.userid)
            actions.setuid({userid: user.userid})
        } else {
            throw new Error("Failed to log in.")
        }
    }),

    setuid: action((state, payload) => {
        state.uid = payload.userid
    }),

    logout: thunk(async (actions, payload) => {
        try {
            let res = await fetch(`api/user/${payload.userid}/auth/logout`,
                {
                    method: "GET",
                    mode: "cors",
                    credentials: "include",
                })
            if (res.ok) {
                window.localStorage.removeItem("userid")
                actions.setuid({userid: ""})
            } else {
                history.push("/internal-error")
            }
        } catch (e) {
            history.push("/internal-error")
        }
    }),
}


export default authModel