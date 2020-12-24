// External imports
import React, { useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy';

// Internal imports
import AnalyticsDashboardNavBar from '../AnalyticsDashboardNavBar/AnalyticsDashboardNavBar'
import LoadingPage from '../../LoadingPage/LoadingPage'
import './AnalyticsDashboardWrapper.scss'
import AnalyticsDashboard from '..'
import Footer from '../../Footer/Footer'

const AnalyticsDashboardWrapper = () => {
    const getCategories = useStoreActions(actions => actions.analytics.getCategories)
    const categories = useStoreState(state => state.analytics.categories)
    const weekYearTable = useStoreState(state => state.analytics.weekYearTable)
    
    const activitySettings = useStoreState(state => state.settings.activitySettings)
    const categorySettings = useStoreState(state => state.settings.categorySettings)

    useEffect(() => {
        getCategories()
    }, [getCategories])

    if (categories.length === 0) {
        return (
            <div
                style={{
                    marginTop: "-100px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}
            >
                <LoadingPage />
            </div>
        )
    }
    
    
    return (
        <div className="analytics-wrapper">
            <AnalyticsDashboardNavBar />
            <AnalyticsDashboard 
                categories={categories} 
                activitySettings={activitySettings} 
                categorySettings={categorySettings}
                weekYearTable={weekYearTable}
            />
            <Footer />
        </div>
    )
}

export default AnalyticsDashboardWrapper