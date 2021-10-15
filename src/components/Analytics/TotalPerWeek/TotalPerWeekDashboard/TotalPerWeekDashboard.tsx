// External imports
import React from "react"

// Internal imports
import "./total-per-week-dashboard.scss"
import {ReactComponent as Loader} from "../../../../svgIcons/spinner.svg";
import TotalPerWeekCategoriesTable from "../TotalPerWeekCategories/TotalPerWeekCategoriesTable/TotalPerWeekCategoriesTable";
import TotalPerWeekCategoriesPieChart
    from "../TotalPerWeekCategories/TotalPerWeekCategoriesPieChart/TotalPerWeekCategoriesPieChart";
import TotalPerWeekActivitiesWrapper
    from "../TotalPerWeekActivities/TotalPerWeekActivitiesWrapper/TotalPerWeekActivitiesWrapper";
import {useStoreState} from "../../../../store/hookSetup";

type TotalPerWeekDashboardProps = {
    loading: boolean
}

const TotalPerWeekDashboard = ({ loading}: TotalPerWeekDashboardProps) => {
    // Store state
    const totalPerWeek = useStoreState(state => state.analytics.totalPerWeek)

    if (loading) {
        return (
            <div id="main-dashboard-table__loading">
                <Loader style={{height: '6rem', width: '6rem'}}/>
            </div>
        )
    }

    return (
        <div className={"total-per-week"}>

            <div className={"card"} style={{marginLeft: 0, marginTop: 0}}>
                <h3 className={"card-title"}>Categories</h3>

                <TotalPerWeekCategoriesTable totalPerWeek={totalPerWeek}/>

                <TotalPerWeekCategoriesPieChart totalPerWeek={totalPerWeek}/>
            </div>

            <div className={"card"} style={{marginTop: 0}}>
                <h3 className={"card-title"}>Activities</h3>

                <TotalPerWeekActivitiesWrapper totalPerWeek={totalPerWeek}/>
            </div>
        </div>
    )
}

export default TotalPerWeekDashboard