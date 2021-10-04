// External imports
import React from "react"

// Internal imports
import "./total-per-week-dashboard.scss"
import {AvailableDate, TotalPerWeek} from "../../../../dao/analyticsDao";
import {ReactComponent as Loader} from "../../../../svgIcons/spinner.svg";
import TotalPerWeekCategoriesTable from "../TotalPerWeekCategories/TotalPerWeekCategoriesTable/TotalPerWeekCategoriesTable";
import NoAnalyticsBanner from "../../BasicComponents/NoAnalyticsBanner/NoAnalyticsBanner";
import TotalPerWeekCategoriesPieChart
    from "../TotalPerWeekCategories/TotalPerWeekCategoriesPieChart/TotalPerWeekCategoriesPieChart";
import TotalPerWeekActivitiesPieChart
    from "../TotalPerWeekActivities/TotalPerWeekActivitiesPieChart/TotalPerWeekActivitiesPieChart";
import TotalPerWeekActivitiesWrapper
    from "../TotalPerWeekActivities/TotalPerWeekActivitiesWrapper/TotalPerWeekActivitiesWrapper";

type TotalPerWeekDashboardProps = {
    totalPerWeek: TotalPerWeek,
    availableDates: AvailableDate[],
    loading: boolean
}

const TotalPerWeekDashboard = ({totalPerWeek, availableDates, loading}: TotalPerWeekDashboardProps) => {
    if (loading) {
        return (
            <div id="main-dashboard-table__loading">
                <Loader style={{height: '6rem', width: '6rem'}}/>
            </div>
        )
    }

    return (
        <div className={"total-per-week"}>

                {totalPerWeek.categoryTypes.length !== 0
                    ?
                    <>
                        <div className={"card"} style={{marginLeft: 0, marginTop: 0}}>
                            <h3 className={"card-title"}>Categories</h3>

                            <TotalPerWeekCategoriesTable totalPerWeek={totalPerWeek}/>

                            <TotalPerWeekCategoriesPieChart totalPerWeek={totalPerWeek}/>
                        </div>

                        <div className={"card"} style={{marginTop: 0}}>
                            <h3 className={"card-title"}>Activities</h3>

                            <TotalPerWeekActivitiesWrapper totalPerWeek={totalPerWeek}/>
                        </div>
                    </>
                    :
                    <NoAnalyticsBanner/>
                }
        </div>
    )
}

export default TotalPerWeekDashboard