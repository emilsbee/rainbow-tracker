// External imports
import React from 'react'
import { useStoreActions } from 'easy-peasy'


// Internal imports
import './login-page.scss'
import  google  from './google-logo.png'


const LoginPage = () => {
    const startLoginWithGoogle = useStoreActions(actions => actions.auth.startLoginWithGoogle)
    
    const beginLogin = () => {
        startLoginWithGoogle()
    }
    const arr = [1,2,3,4,5,6,7,8,9]
    return (
        <div id="login-container">
            <div id="login-components">
                <div id="login-text-components">
                    <p id="login-title">Welcome lazy person!</p>
                    <p id="login-text">Please sign in using one of the following </p>
                </div>
                <button id="login-button" onClick={beginLogin}>
                    <img id="google-logo" src={google}/>
                    <p id="login-button-text">Sign in with Google</p>
                </button>
            </div>

        </div>
    )
}

export default LoginPage