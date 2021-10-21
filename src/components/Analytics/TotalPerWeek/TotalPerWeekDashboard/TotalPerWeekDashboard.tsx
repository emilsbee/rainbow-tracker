// External imports
import React from "react"

// Internal imports
import "./total-per-week-dashboard.scss"
import {ReactComponent as Loader} from "../../../../svgIcons/spinner.svg";
import {useStoreState} from "../../../../store/hookSetup";
import Card from "../../BasicComponents/Card/Card";
import CardTitle from "../../BasicComponents/Card/CardTitle/CardTitle";
import CategoryTable from "../../BasicComponents/CategoryTable/CategoryTable";
import CategoryPieChart from "../../BasicComponents/CategoryPieChart/CategoryPieChart";
import ActivityCardContent from "../../BasicComponents/ActivityCardContent/ActivityCardContent";

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
        <section className={"total-per-week"}>

            <Card style={{marginLeft: 0, marginTop: 0}}>
                <CardTitle title={"Categories"}/>

                <CategoryTable categoryTypes={totalPerWeek.categoryTypes} totalCount={672}/>

                <CategoryPieChart categoryTypes={totalPerWeek.categoryTypes}/>
            </Card>

            <Card style={{marginTop: 0}}>
                <CardTitle title={"Activities"}/>

                <ActivityCardContent
                    categoryTypes={totalPerWeek.categoryTypes}
                    activityTypes={totalPerWeek.activityTypes}
                    totalCount={672}
                />
            </Card>
        </section>
    )
}

export default TotalPerWeekDashboard