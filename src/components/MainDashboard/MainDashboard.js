// External imports
import React, { useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'



// Internal imports 
import MainDashboardTable from '../MainDashboardTable/MainDashboardTable'
import MainDashboardNavBar from '../MainDashboardNavBar/MainDashboardNavBar'
import Footer from '../Footer /Footer'
import NavBar from '../NavBar/NavBar'

const MainDashboard  = () => {
    
    

    return (
        <div>
            <NavBar />
            <MainDashboardNavBar weekNr={35} year={2020} years={[2020]} weeks={[35]} weekid={'weekid1'}/>

            <MainDashboardTable />
            {/* {currentWeek.days && notes && indexNotes && noteIndices && 
                <Footer />
            } */}
            
        </div>
    )
}

export default MainDashboard