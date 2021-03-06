// External imports
import React, {useState} from 'react'
import {DateTime} from "luxon";

// Internal imports
import AnalyticsDashboardNavBar from '../AnalyticsDashboardNavBar/AnalyticsDashboardNavBar'
import './AnalyticsDashboardWrapper.scss'
import AnalyticsDashboard from '../AnalyticsDashboard'
import {getAnalytics, getWeekYearTable} from "../../../store/analytics/helpers";
import {VIEW_WEEK} from "../constants/constants";
import {useStoreActions, useStoreState} from "../../../store/hookSetup";
import {getActivitySettings, getCategorySettings} from "../../../store/settings/helpers";

const AnalyticsDashboardWrapper = () => {
    // Store state
    const activitySettings = useStoreState(state => state.settings.activitySettings)
    const categorySettings = useStoreState(state => state.settings.categorySettings)
    const uid = useStoreState(state => state.auth.uid)
    const currentDate = useStoreState(state => state.analytics.currentDate)

    // Store actions
    const setCategorySettings = useStoreActions(actions => actions.settings.setCategorySettings)
    const setActivitySettings = useStoreActions(actions => actions.settings.setActivitySettings)

    // Local state
    const [view, setView] = useState(VIEW_WEEK)
    const [loading, setLoading]=  React.useState(true)
    const [analytics, setAnalytics] = React.useState(null)
    const [weekYearTable, setWeekYearTable] = React.useState(null)
    const [localYear, setLocalYear] = React.useState(currentDate.year)

    React.useEffect(() => {
        (async function fetchData() {
            try {
                setLoading(true)

                const weekYearTable = await getWeekYearTable(uid)
                const analytics = await getAnalytics(uid, DateTime.now().year, weekYearTable.val())
                setAnalytics(analytics)
                setWeekYearTable(weekYearTable.val())

                const fetchedCategorySettings = await getCategorySettings(uid)
                setCategorySettings({categorySettings:fetchedCategorySettings.val()})
                const fetchedActivitySettings = await getActivitySettings(uid)
                setActivitySettings({activitySettings:fetchedActivitySettings.val()})

                setLoading(false)
            } catch (e) {
                console.error(e)
                setLoading(false)
            }
        })()
    }, [])
   

    // This useEffect listens for changes in the date and when the year changes, it fetches the new year's analytics
    // currentYear local state is the state with which the date is compared to and it gets updated when new year's analytics are fetched
    React.useEffect(() => {
        let currentYear = DateTime.now().startOf("week").year

        if (currentDate.year !== localYear) {
            (
                async function fetchData() {
                    try {
                        setLoading(true)
                        const weekYearTable = await getWeekYearTable(uid)
                        const analytics = await getAnalytics(uid, currentDate.year, weekYearTable.val())
                        setAnalytics(analytics)
                        setWeekYearTable(weekYearTable.val())
                        setLoading(false)
                    } catch (e) {
                        console.error(e)
                        setLoading(false)
                    }
                }
            )()

            setLocalYear(currentDate.year)
        }
    }, [currentDate.year])
    
    
    return (
        <div id="analytics-dashboard-wrapper">
            <AnalyticsDashboardNavBar
                date={currentDate}
                view={view}
                setView={setView}
            />
            <AnalyticsDashboard
                loading={loading}
                analytics={analytics}
                activitySettings={activitySettings}
                categorySettings={categorySettings}
                weekYearTable={weekYearTable}
                date={currentDate}
                view={view}
            />
        </div>
    )
}

export default AnalyticsDashboardWrapper