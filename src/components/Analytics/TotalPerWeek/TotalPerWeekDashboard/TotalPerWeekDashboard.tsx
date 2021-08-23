// External imports
import React from "react"
import {PieChart, Pie, Cell, Tooltip} from 'recharts';

// Internal imports
import "./total-per-week-dashboard.scss"
import {AvailableDate, TotalPerWeek} from "../../../../dao/analytics/analyticsDao";
import {ReactComponent as Loader} from "../../../../svgIcons/spinner.svg";
import TotalPerWeekTable from "../../TotalPerWeekTable/TotalPerWeekTable";
import NoAnalyticsBanner from "../../BasicComponents/NoAnalyticsBanner/NoAnalyticsBanner";

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
                    <div className={"card"}>
                            <h3 className={"card-title"}>Categories</h3>

                            <TotalPerWeekTable totalPerWeek={totalPerWeek}/>

                            <PieChart width={300} height={300}>

                                <Tooltip
                                    contentStyle={{backgroundColor: "white", borderColor: "white", borderRadius: "7px", opacity: .85}}
                                    itemStyle={{color: "black"}}
                                />

                                <Pie
                                    data={totalPerWeek.categoryTypes}
                                    cx={145}
                                    cy={150}
                                    innerRadius={75}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="count"
                                    animationBegin={10}
                                    animationDuration={900}
                                >
                                    {totalPerWeek.categoryTypes.map((entry, index) => {
                                        return (<Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                            stroke={entry.color}
                                        />)
                                    })}
                                </Pie>
                            </PieChart>

                    </div>
                    :
                    <NoAnalyticsBanner/>
                }
        </div>
    )
}

export default TotalPerWeekDashboard