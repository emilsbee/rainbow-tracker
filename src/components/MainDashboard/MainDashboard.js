// External imports
import React from 'react'
import { useStoreState } from 'easy-peasy'



// Internal imports 
import MainDashboardTable from '../MainDashboardTable/MainDashboardTable'
import MainDashboardNavBar from '../MainDashboardNavBar/MainDashboardNavBar'
import Footer from '../Footer /Footer'
import NavBar from '../NavBar/NavBar'

const MainDashboard  = () => {
    
    const currentDate = useStoreState(state => state.settings.currentDate)
    return (
        <div>
            <NavBar />
            
            <MainDashboardNavBar weekNr={currentDate.weekNr} year={currentDate.year}/>

            <MainDashboardTable />
            
            <Footer />
        </div>
    )
}

export default MainDashboard