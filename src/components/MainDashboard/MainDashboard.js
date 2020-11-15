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
    // const connectionError = useStoreState(state => state.settings.connectionError)

    // if (connectionError) {
    //     return (
    //         <div>
    //             Error, refresh browser
    //         </div>
    //     )
    // }

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