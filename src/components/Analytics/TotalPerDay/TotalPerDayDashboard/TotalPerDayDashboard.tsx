// External imports
import React from "react"

// Internal imports
import {ReactComponent as Loader} from "../../../../svgIcons/spinner.svg";
import {TotalPerDay} from "../../../../dao/analytics/analyticsDao";
import TotalPerDayCategoriesChart from "../TotalPerDayCategoriesChart/TotalPerDayCategoriesChart";

type TotalPerDayDashboardProps = {
    loading: boolean,
    totalPerDay: TotalPerDay[]
}

const TotalPerDayDashboard = ({loading, totalPerDay}: TotalPerDayDashboardProps) => {

    if (loading) {
        return (
            <div id="main-dashboard-table__loading">
                <Loader style={{height: '6rem', width: '6rem'}}/>
            </div>
        )
    }

    return (
        <TotalPerDayCategoriesChart totalPerDay={totalPerDay}/>
    )
}

export default TotalPerDayDashboard