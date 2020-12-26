// External imports
import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy';
import moment from 'moment'

// Internal imports
import AnalyticsDashboardNavBar from '../AnalyticsDashboardNavBar/AnalyticsDashboardNavBar'
import LoadingPage from '../../LoadingPage/LoadingPage'
import './AnalyticsDashboardWrapper.scss'
import AnalyticsDashboard from '..'
import Footer from '../../Footer/Footer'
import { goBack, goForward, setCurrentDate } from '../helpers'

const AnalyticsDashboardWrapper = () => {
    const getCategories = useStoreActions(actions => actions.analytics.getCategories)
    const categories = useStoreState(state => state.analytics.categories)
    const weekYearTable = useStoreState(state => state.analytics.weekYearTable)
    
    const activitySettings = useStoreState(state => state.settings.activitySettings)
    const categorySettings = useStoreState(state => state.settings.categorySettings)

    const [date, setDate] = useState({week: moment().isoWeek(), year: moment().year(), month: moment().month() }) // week: a week number, year: a year, month: monthNumber (0 to 11 instead of 1 to 12)
    const [view, setView] = useState("week") // Possible values: "week", "month", "year"
    
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
            <AnalyticsDashboardNavBar 
                date={date} 
                view={view} 
                setView={setView} 
                goBack={() => goBack(view, date, setDate)} 
                goForward={() => goForward(view, date, setDate)}
                setCurrentDate={() => setCurrentDate(setDate)}
            />
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