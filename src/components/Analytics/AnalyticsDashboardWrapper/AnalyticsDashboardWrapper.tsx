// External imports
import React from "react"
import {useHistory, useLocation} from "react-router-dom";

// Internal imports
import './analytics-dashboard-wrapper.scss'
import TabBar from "../../BasicComponents/TabBar/TabBar";
import TotalPerWeekWrapper from "../TotalPerWeek/TotalPerWeekWrapper/TotalPerWeekWrapper";
import TotalPerDayWrapper from "../TotalPerDay/TotalPerDayWrapper/TotalPerDayWrapper";
import TotalPerMonthWrapper from "../TotalPerMonth/TotalPerMonthWrapper/TotalPerMonthWrapper";

/**
 * The wrapper component for all analytics tabs.
 */
const AnalyticsDashboardWrapper = () => {
    const tabs = ["Monthly", "Weekly", "Daily"]

    const location = useLocation()
    const history = useHistory()

    // Local state
    const [selectedTabIndex, setSelectedTabIndex] = React.useState(0)

    React.useEffect(() => {
        const currentPath = location.pathname.split("/")

        if (currentPath.length === 3) {

            const tab = currentPath[2]

            for (let i = 0; i < tabs.length; i++) {
                if (tab === tabs[i].toLowerCase()) {
                    setSelectedTabIndex(i)
                }
            }
        } else {
            setSelectedTabIndex(0)
            history.push("/analytics/monthly")
        }
    }, [location])

    return (
        <div className={"analytics-dashboard-wrapper"}>
            <TabBar tabs={tabs} selectedIndex={selectedTabIndex} onSelect={(selected) => setSelectedTabIndex(selected)}/>

            {tabs.map((tab, index) => {

                if (selectedTabIndex === 0 && selectedTabIndex === index) {
                    return <TotalPerMonthWrapper key={index}/>
                } else if (selectedTabIndex === 1 && selectedTabIndex === index) {
                    return <TotalPerWeekWrapper key={index}/>
                } else if (selectedTabIndex === 2 && selectedTabIndex === index) {
                    return <TotalPerDayWrapper key={index}/>
                }

            })}
        </div>
    )
}

export default AnalyticsDashboardWrapper