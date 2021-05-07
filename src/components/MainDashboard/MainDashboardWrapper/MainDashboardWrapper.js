// External imports
import React from 'react'
import { useStoreState } from 'easy-peasy'

// Internal imports 
import './MainDashboardWrapper.scss'
import MainDashboardTable from '../MainDashboardTable/MainDashboardTable'
import MainDashboardNavBar from '../MainDashboardNavBar/MainDashboardNavBar'

const MainDashboardWrapper = () => {
    const currentDate = useStoreState(state => state.settings.currentDate)

    return (
        <div id="main-dash-wrapper">
            
            <MainDashboardNavBar weekNr={parseInt(currentDate.weekNr)} year={parseInt(currentDate.year)}/>

            <MainDashboardTable />
        </div>
    );
}
 
export default MainDashboardWrapper;