// External imports
import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy';
import moment from 'moment'

// Internal imports
import AnalyticsDashboardNavBar from '../AnalyticsDashboardNavBar/AnalyticsDashboardNavBar'
import './AnalyticsDashboardWrapper.scss'
import AnalyticsDashboard from '../AnalyticsDashboard'
import { goBack, goForward, setCurrentDate } from '../AnalyticsDashboard/helpers'

const AnalyticsDashboardWrapper = () => {
    // Store actions
    const getCategories = useStoreActions(actions => actions.analytics.getCategories)
    const setcategories = useStoreActions(actions => actions.analytics.setcategories)

    // Store state
    const categories = useStoreState(state => state.analytics.categories)
    const weekYearTable = useStoreState(state => state.analytics.weekYearTable)
    const activitySettings = useStoreState(state => state.settings.activitySettings)
    const categorySettings = useStoreState(state => state.settings.categorySettings)

    // Local state
    const [date, setDate] = useState({week: moment().isoWeek(), year: moment().year(), month: moment().month() }) // week: a week number, year: a year, month: monthNumber (0 to 11 instead of 1 to 12)
    const [view, setView] = useState("week") // Possible values: "week", "month", "year"
    const [currentYear, setCurrentYear] = useState(moment().year())


    useEffect(() => {
        getCategories({year: moment().year()})
    }, [getCategories])
   

    // This useEffect listens for changes in the date and when the year changes, it fetches the new year's analytics
    // currentYear local state is the state with which the date is compared to and it gets updated when new year's analytics are fetched
    useEffect(() => {
        if (date.year !== currentYear) {
            setcategories({categories: []})
            getCategories({year: date.year})
            setCurrentYear(date.year)
        }
    }, [currentYear, date, getCategories, setcategories])
    
    
    return (
        <div className="analytics-wrapper">
            Work in progress.
            {/*<AnalyticsDashboardNavBar */}
            {/*    date={date} */}
            {/*    view={view} */}
            {/*    setView={setView} */}
            {/*    goBack={() => goBack(view, date, setDate)} */}
            {/*    goForward={() => goForward(view, date, setDate)}*/}
            {/*    setCurrentDate={() => setCurrentDate(setDate)}*/}
            {/*/>*/}
            {/*<AnalyticsDashboard */}
            {/*    categories={categories} */}
            {/*    activitySettings={activitySettings} */}
            {/*    categorySettings={categorySettings}*/}
            {/*    weekYearTable={weekYearTable}*/}
            {/*    view={view}*/}
            {/*    date={date}*/}
            {/*/>*/}
        </div>
    )
}

export default AnalyticsDashboardWrapper