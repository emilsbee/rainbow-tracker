// External imports
import React from "react"

// Internal imports
import './analytics-dashboard.scss'
import TabBar from "../../BasicComponents/TabBar/TabBar";
import {TotalPerWeek} from "../../../dao/analytics/analyticsDao";
import {ReactComponent as Loader} from "../../../svgIcons/spinner.svg";
import ToolBar from "../../BasicComponents/ToolBar/ToolBar";
import Dropdown from "../../BasicComponents/ToolBar/ToolBarItems/Dropdown/Dropdown";
import TotalPerWeekComponent from "../TotalPerWeekComponent/TotalPerWeekComponent";

type AnalyticsDashboardProps = {
    totalPerWeek: TotalPerWeek[],
    loading: boolean
}

const AnalyticsDashboard = ({totalPerWeek, loading}: AnalyticsDashboardProps) => {
    // Local state
    const [selectedTabIndex, setSelectedTabIndex] = React.useState(0) //

    if (loading) {
        return (
            <div id="main-dashboard-table__loading">
                <Loader style={{height: '6rem', width: '6rem'}}/>
            </div>
        )
    }

    return (
        <div className={"analytics-dashboard"}>
            <TabBar tabs={["Total per week", "Total per day"]} selectedIndex={selectedTabIndex} onSelect={(selected) => setSelectedTabIndex(selected)}/>
            <ToolBar>
                <Dropdown label={"Year"} options={[2021, 2020]} onSelect={(data) => console.log(data)}/>
                <Dropdown label={"Week"} options={[52, 51, 50, 49, 48]} onSelect={(data) => console.log(data)}/>
            </ToolBar>

            <div className={"analytics-dashboard__content"}>
                {totalPerWeek.length !== 0 && <TotalPerWeekComponent totalPerWeek={totalPerWeek[0]}/>}
            </div>
        </div>
    )
}

export default AnalyticsDashboard