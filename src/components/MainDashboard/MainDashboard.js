// External imports
import React from 'react'
import { useStoreState } from 'easy-peasy'

// Internal imports 
import './MainDashboard.scss'
import MainDashboardTable from './MainDashboardTable/MainDashboardTable'
import MainDashboardNavBar from './MainDashboardNavBar/MainDashboardNavBar'
import Footer from '../Footer/Footer'

const MainDashboard  = () => {

    const currentDate = useStoreState(state => state.settings.currentDate)

    return (
        <div id="main-dash-wrapper">
            <MainDashboardNavBar weekNr={parseInt(currentDate.weekNr)} year={parseInt(currentDate.year)}/>

            <MainDashboardTable />
            
            <Footer />
        </div>
    )
}

export default MainDashboard