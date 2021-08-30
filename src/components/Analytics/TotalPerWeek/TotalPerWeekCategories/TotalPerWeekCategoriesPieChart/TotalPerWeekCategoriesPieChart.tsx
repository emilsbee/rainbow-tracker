// External imports
import React from "react"
import {PieChart, Pie, Cell, Tooltip} from 'recharts';

// Internal imports
import {TotalPerWeek} from "../../../../../dao/analytics/analyticsDao";

type TotalPerWeekCategoriesPieChartProps = {
    totalPerWeek: TotalPerWeek
}

const TotalPerWeekCategoriesPieChart = ({totalPerWeek}: TotalPerWeekCategoriesPieChartProps) => {

    return (
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
    )
}

export default TotalPerWeekCategoriesPieChart