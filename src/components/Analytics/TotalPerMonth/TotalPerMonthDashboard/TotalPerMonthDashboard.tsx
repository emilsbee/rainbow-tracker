// External imports
import React from "react"

// Internal imports
import "./total-per-month-dashboard.scss"
import {useStoreState} from "../../../../store/hookSetup";
import {ReactComponent as Loader} from "../../../../svgIcons/spinner.svg";
import TotalPerWeekCategoriesTable
    from "../../TotalPerWeek/TotalPerWeekCategories/TotalPerWeekCategoriesTable/TotalPerWeekCategoriesTable";
import TotalPerWeekCategoriesPieChart
    from "../../TotalPerWeek/TotalPerWeekCategories/TotalPerWeekCategoriesPieChart/TotalPerWeekCategoriesPieChart";
import TotalPerWeekActivitiesWrapper
    from "../../TotalPerWeek/TotalPerWeekActivities/TotalPerWeekActivitiesWrapper/TotalPerWeekActivitiesWrapper";

type TotalPerMonthDashboardProps = {
    loading: boolean
}

const TotalPerMonthDashboard:React.FC<TotalPerMonthDashboardProps> = ({loading}) => {
    // Store state
    const totalPerMonth = useStoreState(state => state.analytics.totalPerMonth)

    if (loading) {
        return (
            <div id="main-dashboard-table__loading">
                <Loader style={{height: '6rem', width: '6rem'}}/>
            </div>
        )
    }

    return (
        <div className={"total-per-month"}>

            <div className={"card"} style={{marginLeft: 0, marginTop: 0}}>
                <h3 className={"card-title"}>Categories</h3>

                <TotalPerWeekCategoriesTable totalPerWeek={totalPerMonth}/>
                <TotalPerWeekCategoriesPieChart totalPerWeek={totalPerMonth}/>
            </div>

            <div className={"card"} style={{marginTop: 0}}>
                <h3 className={"card-title"}>Activities</h3>

                <TotalPerWeekActivitiesWrapper totalPerWeek={totalPerMonth}/>
            </div>
        </div>
    )
}

export default TotalPerMonthDashboard