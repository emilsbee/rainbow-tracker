// External imports
import React from "react"

// Internal imports
import './analytics-dashboard-wrapper.scss'
import {getTotalPerWeek, TotalPerWeek} from "../../../dao/analytics/analyticsDao";
import {useStoreState} from "../../../store/hookSetup";
import AnalyticsDashboard from "../AnalyticsDashboard/AnalyticsDashboard";

const AnalyticsDashboardWrapper = () => {
    // Store state
    const userid = useStoreState(state => state.auth.uid)
    const currentDate = useStoreState(state => state.settings.currentDate)

    // Local state
    const [totalPerWeek, setTotalPerWeek] = React.useState<TotalPerWeek[]>([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        (async function() {
            setLoading(true)

            const fetchedTotalPerWeek = await getTotalPerWeek(userid, currentDate.weekNr, currentDate.year)
            setTotalPerWeek(fetchedTotalPerWeek)

            setLoading(false)
        })()
    }, [])

    return (
        <div className={"analytics-dashboard-wrapper"}>
            <AnalyticsDashboard totalPerWeek={totalPerWeek} loading={loading}/>
        </div>
    )
}

export default AnalyticsDashboardWrapper