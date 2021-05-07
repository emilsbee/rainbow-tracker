// External imports
import React from 'react'
import { useStoreActions } from 'easy-peasy'


// Internal imports
import './login-page.scss'
import  google  from './google-logo.png'
import { ReactComponent as Anonymous } from './anonymous.svg'


const LoginPage = () => {
    const startLoginWithGoogle = useStoreActions(actions => actions.auth.startLoginWithGoogle)
    const startLoginAnonymously = useStoreActions(actions => actions.auth.startLoginAnonymously)

    const beginLogin = () => {
        startLoginWithGoogle()
    }
    
    const beginAnon = () => {
        startLoginAnonymously()
    }

    return (
        <div id="login-container">
            <div id="login-components">
                <div id="login-text-components">
                    <p id="login-title">Welcome, lazy person!</p>
                    <p id="login-text">Please sign in using one of the following </p>
                </div>
                <button id="login-button" onClick={beginLogin}>
                    <img id="google-logo" alt="Loading..." src={google}/>
                    <p id="login-button-text">Sign in with Google</p>
                </button>
                <button id="login-button" onClick={beginAnon}>
                    <Anonymous id="login-button-svg"/>
                    <p id="login-button-text">Sign in anonymously</p>
                </button>
            </div>

        </div>
    )
}

export default LoginPage