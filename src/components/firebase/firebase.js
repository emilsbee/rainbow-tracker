// External imports
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

// Internal imports



var firebaseConfig = {
    apiKey: "AIzaSyCKlW2jr8Y6mmCYqPUsFg_rt_VcGCy717g",
    authDomain: "rainbow-tracker-5b9b7.firebaseapp.com",
    databaseURL: "https://rainbow-tracker-5b9b7.firebaseio.com",
    projectId: "rainbow-tracker-5b9b7",
    storageBucket: "rainbow-tracker-5b9b7.appspot.com",
    messagingSenderId: "10284248012",
    appId: "1:10284248012:web:2ba6459c059a184fb90b69",
    measurementId: "G-BP7BDKGRZN"

};

firebase.initializeApp(firebaseConfig)

const database = firebase.database()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { firebase, googleAuthProvider, database as default }