// External imports
import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy';
import moment from 'moment'
import {DateTime} from "luxon";

// Internal imports
import AnalyticsDashboardNavBar from '../AnalyticsDashboardNavBar/AnalyticsDashboardNavBar'
import './AnalyticsDashboardWrapper.scss'
import AnalyticsDashboard from '../AnalyticsDashboard'
import { goBack, goForward, setCurrentDate } from '../AnalyticsDashboard/helpers'
import {getActivitySettings, getCategorySettings} from "../../../store/settings/helpers";
import {getAnalytics, getWeekYearTable} from "../../../store/analytics/helpers";

const AnalyticsDashboardWrapper = () => {
    // Store state
    const activitySettings = useStoreState(state => state.settings.activitySettings)
    const categorySettings = useStoreState(state => state.settings.categorySettings)
    const uid = useStoreState(state => state.auth.uid)

    // Local state
    const [date, setDate] = useState({week: moment().isoWeek(), year: moment().year(), month: moment().month() }) // week: a week number, year: a year, month: monthNumber (0 to 11 instead of 1 to 12)
    const [view, setView] = useState("week") // Possible values: "week", "month", "year"
    const [currentYear, setCurrentYear] = useState(moment().year())
    const [loading, setLoading]=  React.useState(true)
    const [analytics, setanalytics] = React.useState(null)
    const [weekYearTable, setWeekYearTable] = React.useState(null)

    useEffect(() => {
        (async function fetchData() {
            try {
                setLoading(true)
                const weekYearTable = await getWeekYearTable(uid)
                const analytics = await getAnalytics(uid, DateTime.now().year, weekYearTable.val())
                setanalytics(analytics)
                setWeekYearTable(weekYearTable.val())
                setLoading(false)
            } catch (e) {
                console.error(e)
                setLoading(false)
            }
        })()
    }, [])
   

    // // This useEffect listens for changes in the date and when the year changes, it fetches the new year's analytics
    // // currentYear local state is the state with which the date is compared to and it gets updated when new year's analytics are fetched
    // useEffect(() => {
    //     if (date.year !== currentYear) {
    //         setcategories({categories: []})
    //         getCategories({year: date.year})
    //         setCurrentYear(date.year)
    //     }
    // }, [currentYear, date, getCategories, setcategories])
    
    
    return (
        <div className="analytics-wrapper">
            {/*<AnalyticsDashboardNavBar */}
            {/*    date={date} */}
            {/*    view={view} */}
            {/*    setView={setView} */}
            {/*    goBack={() => goBack(view, date, setDate)} */}
            {/*    goForward={() => goForward(view, date, setDate)}*/}
            {/*    setCurrentDate={() => setCurrentDate(setDate)}*/}
            {/*/>*/}
            <AnalyticsDashboard
                loading={loading}
                analytics={analytics}
                activitySettings={activitySettings}
                categorySettings={categorySettings}
                weekYearTable={weekYearTable}
                view={view}
                date={date}
            />
        </div>
    )
}

export default AnalyticsDashboardWrapper