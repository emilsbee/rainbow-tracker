// External imports
import React from 'react'

// Internal imports
import './login-page.scss'
import {useStoreActions} from "../../store/hookSetup";
import {ReactComponent as Loader} from "../../svgIcons/spinner.svg";
import {checkIfLoggedIn} from "../../store/auth/helpers";


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
            <div className="login-loading">
                <Loader style={{height: '6rem', width: '6rem'}}/>
            </div>
        )
    }


    return (
        <section className="login-container">
            <h2 className={"login-header"}>
                Welcome, curious person!
            </h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <p style={{marginBottom: "5px"}}>Email</p>
                    <input
                        style={{marginBottom: "20px"}}
                        type={"text"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-input"
                    />
                </label>

                <label>
                    <p style={{marginBottom: "5px"}}>Password</p>
                    <input
                        style={{marginBottom: "20px"}}
                        type={"password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                    />
                </label>

                <section className={"login-button-container"}>
                    <button className="login-button" type={"submit"}>Login</button>
                </section>
            </form>
        </section>
    )
}

export default LoginPage