// External imports
import React from 'react'

// Internal imports
import './loading-page.scss'
import { ReactComponent as Spinner } from './spinner.svg'

const LoadingPage = ({backgroundColor}) => (
    <div className="loader"> 
        {/* <img alt="" className="loader__image" src="/images/loader.gif" /> */}
        <Spinner style={{backgroundColor: backgroundColor, height: '6rem', width: '6rem'}}/>
    </div>
)

export default LoadingPage;