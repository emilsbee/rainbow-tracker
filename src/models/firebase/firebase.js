// External imports
import { thunk, action } from "easy-peasy"


// Internal imports
import { store } from '../../index'
import 
    database, 
    { 
        firebase,
        googleAuthProvider
    } 
from '../../components/firebase/firebase'



const firebaseModel = {
    uid: '',
    addUser: thunk(async (actions, payload) => {
        return database.ref('users/' + payload.userId).set({
            username: payload.name,
            email: payload.email,
        })
    }),
    readUser: thunk(async (actions, payload) => {
        return database.ref('users/' + payload.userId)
            .once('value')
    }),
    startLoginAnonymously: thunk(async (actions, payload) => {
        firebase.auth().signInAnonymously().catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
          
    }),
    startLoginWithGoogle: thunk(async (actions, payload) => {
        await firebase.auth().signInWithRedirect(googleAuthProvider)
    }),
    login: action((state, payload) => {
        state.uid = payload
    }),
    startLogout: thunk(async (actions, payload) => {
        const setNotes = store.getActions().notes.setNotes
        const setCategories = store.getActions().activities.setCategories
        const setActivitySettings = store.getActions().settings.setActivitySettings
        const setCategorySettings = store.getActions().settings.setCategorySettings
        setNotes({notes: []})
        setCategories({categories: []})
        setCategorySettings({categorySettings: null})
        setActivitySettings({activitySettings: null})
        await firebase.auth().signOut()
    }),
    logout: action((state, payload) => {
        state.uid = ''
    })
    
}


export default firebaseModel