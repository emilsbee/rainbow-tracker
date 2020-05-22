// External imports
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

// Internal imports

var firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID

};

firebase.initializeApp(firebaseConfig)

const database = firebase.database()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
// const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()
// const twitterAuthProvider = new firebase.auth.TwitterAuthProvider()
// const githubAuthProvider = new firebase.auth.GithubAuthProvider()


export { 
    firebase, 
    googleAuthProvider,
    database as default 
}