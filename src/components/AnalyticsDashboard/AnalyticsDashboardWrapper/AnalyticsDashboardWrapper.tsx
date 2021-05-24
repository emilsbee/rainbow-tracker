// External imports
import React, {useState} from 'react'
import {DateTime} from "luxon";

// Internal imports
import AnalyticsDashboardNavBar from '../AnalyticsDashboardNavBar/AnalyticsDashboardNavBar'
import { goBack, goForward, setCurrentDate } from '../AnalyticsDashboard/helpers'
import './AnalyticsDashboardWrapper.scss'
import AnalyticsDashboard from '../AnalyticsDashboard'
import {getAnalytics, getWeekYearTable} from "../../../store/analytics/helpers";
import {VIEW_WEEK} from "../constants/constants";
import {useStoreState} from "../../../store/hookSetup";

const AnalyticsDashboardWrapper = () => {
    // Store state
    const activitySettings = useStoreState(state => state.settings.activitySettings)
    const categorySettings = useStoreState(state => state.settings.categorySettings)
    const uid = useStoreState(state => state.auth.uid)

    // Local state
    const [date, setDate] = useState({week: DateTime.now().weekNumber, year: DateTime.now().startOf("week").year, month: DateTime.now().month })
    const [view, setView] = useState(VIEW_WEEK)
    const [loading, setLoading]=  React.useState(true)
    const [analytics, setAnalytics] = React.useState(null)
    const [weekYearTable, setWeekYearTable] = React.useState(null)

    React.useEffect(() => {
        (async function fetchData() {
            try {
                setLoading(true)
                const weekYearTable = await getWeekYearTable(uid)
                const analytics = await getAnalytics(uid, DateTime.now().year, weekYearTable.val())
                setAnalytics(analytics)
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
        <div id="analytics-dashboard-wrapper">
            <AnalyticsDashboardNavBar
                date={date}
                view={view}
                setView={setView}
                goBack={() => goBack(view, date, setDate)}
                goForward={() => goForward(view, date, setDate)}
                setCurrentDate={() => setCurrentDate(setDate)}
            />
            <AnalyticsDashboard
                loading={loading}
                analytics={analytics}
                activitySettings={activitySettings}
                categorySettings={categorySettings}
                weekYearTable={weekYearTable}
                date={date}
                view={view}
            />
        </div>
    )
}

export default AnalyticsDashboardWrapper