// External imports
import React from 'react'

// Internal imports
import './login-page.scss'
import {useStoreActions} from "../../store/hookSetup";


const LoginPage = () => {
    const login = useStoreActions(actions => actions.auth.login)

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        if (email && email.length > 0 && password && password.length > 0) {
            login({email, password})
        }
    }

    return (
        <div id="login-container">
            <h2>
                Welcome, lazy person!
            </h2>
            <h3>
                Please Log In
            </h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Email</p>
                    <input
                        type={"text"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>

                <label>
                    <p>Password</p>
                    <input
                        type={"password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                <div>
                    <button type={"submit"}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage