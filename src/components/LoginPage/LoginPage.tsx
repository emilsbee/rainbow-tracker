// External imports
import React from 'react'

// Internal imports
import './login-page.scss'
import {useStoreActions} from "../../store/hookSetup";
import {ReactComponent as Loader} from "../../svgIcons/spinner.svg";
import {checkIfLoggedIn} from "../../store/auth/helpers";
import {history} from "../../routers/AppRouter";


const LoginPage = () => {
    // Store actions
    const login = useStoreActions(actions => actions.auth.login)
    const setuid = useStoreActions(actions => actions.auth.setuid)

    // Local state
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [loading, setLoading] = React.useState(true)


    React.useEffect(() => {

        (async function () {
            const userid = window.localStorage.getItem("userid")

            if (userid) {
                const loggedIn: boolean = await checkIfLoggedIn(userid)

                if (loggedIn) {
                    setuid({userid})
                } else {
                    setLoading(false)
                }
            } else {
                setLoading(false)
            }
        })()

    }, [])


    const handleSubmit = (e:  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (email && email.length > 0 && password && password.length > 0) {
            login({email, password})
        }
    }

    if (loading) {
        return (
            <div id="login-loading">
                <Loader style={{height: '6rem', width: '6rem'}}/>
            </div>
        )
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