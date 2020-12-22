// External imports
import React, {useEffect} from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'

// Internal imports 
import MainDashboardTable from './MainDashboardTable/MainDashboardTable'
import MainDashboardNavBar from './MainDashboardNavBar/MainDashboardNavBar'
import Footer from '../Footer /Footer'

const MainDashboard  = () => {
    
    const currentDate = useStoreState(state => state.settings.currentDate)
    const startCategoryListener = useStoreActions(actions => actions.analytics.startCategoryListener)
    const stopCategoryListener = useStoreActions(actions => actions.analytics.stopCategoryListener)

    useEffect(() => {
        startCategoryListener()

        return () => {
            stopCategoryListener()
        }
    }, [startCategoryListener, stopCategoryListener])

    return (
        <div>
            <MainDashboardNavBar weekNr={currentDate.weekNr} year={currentDate.year}/>

            <MainDashboardTable />
            
            <Footer />
        </div>
    )
}

export default MainDashboard