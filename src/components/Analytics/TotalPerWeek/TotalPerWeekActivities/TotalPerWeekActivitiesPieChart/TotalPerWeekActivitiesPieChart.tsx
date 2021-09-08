// External imports
import React from "react"
import {PieChart, Pie, Cell, Tooltip} from 'recharts';

// Internal imports
import {TotalPerWeek} from "../../../../../dao/analytics/analyticsDao";

type TotalPerWeekActivitiesPieChartProps = {
    totalPerWeek: TotalPerWeek,
    pickedCategoryid: string,
    color: string
}

const TotalPerWeekActivitiesPieChart = ({totalPerWeek, pickedCategoryid, color}: TotalPerWeekActivitiesPieChartProps) => {

    return (
        <PieChart width={300} height={300}>

            <Tooltip
                contentStyle={{backgroundColor: "white", borderColor: "white", borderRadius: "7px", opacity: .85}}
                itemStyle={{color: "black"}}
            />

            <Pie
                data={totalPerWeek.activityTypes.filter(activityType => activityType.categoryid === pickedCategoryid)}
                cx={145}
                cy={150}
                innerRadius={75}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="count"
                animationBegin={10}
                animationDuration={900}
                nameKey={"long"}
            >
                {totalPerWeek.activityTypes.map((entry, index) => {
                    if (entry.categoryid === pickedCategoryid) {
                        return (
                            <Cell
                                key={`cell-${index}`}
                                fill={color}
                                stroke={color}
                            />
                        )
                    } else return null
                })}
            </Pie>
        </PieChart>
    )
}

export default TotalPerWeekActivitiesPieChart