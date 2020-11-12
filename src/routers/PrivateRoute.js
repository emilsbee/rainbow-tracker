// External imports
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useStoreState } from 'easy-peasy'


// Internal imports 



const PrivateRoute = (props) => {
    
    const uid = useStoreState(state => state.auth.uid)
    const isAuthenticated = !!uid
    const Component = props.component
    
    return (
        <Route path={props.path} component={(props) => (
            
            isAuthenticated ? (
                <div>
                    <Component {...props}/>

                </div>
            ) : (
                <Redirect to="/"/>
            )
        )}>
            
        </Route>
    )
}

export default PrivateRoute