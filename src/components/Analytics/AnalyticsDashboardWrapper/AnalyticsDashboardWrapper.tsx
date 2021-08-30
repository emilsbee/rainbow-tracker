// External imports
import React from "react"

// Internal imports
import './analytics-dashboard-wrapper.scss'
import TabBar from "../../BasicComponents/TabBar/TabBar";
import TotalPerWeekWrapper from "../TotalPerWeek/TotalPerWeekWrapper/TotalPerWeekWrapper";
import TotalPerDayWrapper from "../TotalPerDay/TotalPerDayWrapper/TotalPerDayWrapper";

/**
 * The wrapper component for all analytics tabs.
 */
const AnalyticsDashboardWrapper = () => {
    const tabs = ["Total per week", "Total per day"]

    // Local state
    const [selectedTabIndex, setSelectedTabIndex] = React.useState(0)

    return (
        <div className={"analytics-dashboard-wrapper"}>
            <TabBar tabs={tabs} selectedIndex={selectedTabIndex} onSelect={(selected) => setSelectedTabIndex(selected)}/>

            {tabs.map((tab, index) => {

                if (selectedTabIndex === 0 && selectedTabIndex === index) {
                    return <TotalPerWeekWrapper key={index}/>
                } else if (selectedTabIndex === 1 && selectedTabIndex === index) {
                    return <TotalPerDayWrapper key={index}/>
                }

            })}
        </div>
    )
}

export default AnalyticsDashboardWrapper