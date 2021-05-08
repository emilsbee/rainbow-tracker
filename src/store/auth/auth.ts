// External imports
import {thunk, action, Thunk, Action} from "easy-peasy"

// Internal imforports
import {firebase, googleAuthProvider} from '../../firebase/firebase'

/**
 * Authentication model. Stores state and functionality to change it
 * related to user authentication.
 */
export interface AuthModel {
    // User id, if present indicates that user has logged in.
    uid:string,

    /**
     * Starts anonymous login with auth.
     */
    startLoginAnonymously: Thunk<AuthModel, {}>,
    /**
     * Start login with Google.
     */
    startLoginWithGoogle: Thunk<AuthModel, {}>,

    /**
     * Sets the user as logged in.
     */
    login: Action<AuthModel, {userId:string}>,
    /**
     * Starts logout with Firebase.
     */
    startLogout: Thunk<AuthModel, {}>,
    /**
     * Sets the user as logged out.
     */
    logout: Action<AuthModel, {}>
}

const authModel:AuthModel = {
    uid: '',

    startLoginAnonymously: thunk(async (actions, payload) => {
        firebase.auth().signInAnonymously().catch(function(error) {
            console.error("Error code: "+error.code+"Error message: "+error.message)
        });
    }),
    startLoginWithGoogle: thunk(async (actions, payload) => {
        firebase.auth().signInWithRedirect(googleAuthProvider).catch(function(error) {
            console.error("Error code: "+error.code+"Error message: "+error.message)
        });
    }),

    login: action((state, payload) => {
        state.uid = payload.userId
    }),
    startLogout: thunk(async (actions, payload) => {
        await firebase.auth().signOut()
    }),
    logout: action((state, payload) => {
        state.uid = ''
    })
}


export default authModel