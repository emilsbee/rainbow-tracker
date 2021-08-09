// External imports
import {thunk, action, Thunk, Action} from "easy-peasy"

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
        let res = await fetch(`${process.env.REACT_APP_HOST}/auth/login`, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: payload.email, password: payload.password})
        })

        let user = await res.json()

        if (res.ok) {
            window.localStorage.setItem("userid", user[0].userid)
            actions.setuid({userid: user[0].userid})
        }
    }),

    setuid: action((state, payload) => {
        state.uid = payload.userid
    }),

    logout: thunk(async (actions, payload) => {
        let res = await fetch(`${process.env.REACT_APP_HOST}/user/${payload.userid}/auth/logout`,
            {
                method: "GET",
                mode: "cors",
                credentials: "include",
            })

        if (res.ok) {
            window.localStorage.removeItem("userid")
            actions.setuid({userid: ""})
        }
    }),
}


export default authModel