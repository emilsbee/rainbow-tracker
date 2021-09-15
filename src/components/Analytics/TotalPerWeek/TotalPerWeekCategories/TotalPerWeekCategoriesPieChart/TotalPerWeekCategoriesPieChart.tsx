// External imports
import React from "react"
import {PieChart, Pie, Cell, Tooltip, TooltipProps} from 'recharts';

// Internal imports
import {TotalPerWeek} from "../../../../../dao/analytics/analyticsDao";
import {Duration} from "luxon";

type TotalPerWeekCategoriesPieChartProps = {
    totalPerWeek: TotalPerWeek
}

const TotalPerWeekCategoriesPieChart = ({totalPerWeek}: TotalPerWeekCategoriesPieChartProps) => {

    const CustomTooltip = ({ payload, active}: TooltipProps<number, string>) => {
        if (active && payload && payload.length) {

            return (
                <div className="custom-tooltip">
                    {payload.map(entry => (
                        <p style={{color: entry.payload.stroke}}>
                            {entry.name}: {entry.value && Duration.fromObject({minutes: entry.value*15}).toFormat("h:mm")}h
                        </p>
                    ))}
                </div>
            );
        } else return null
    }

    return (
        <PieChart width={300} height={300}>

            <Tooltip
                content={<CustomTooltip />}
            />

            <Pie
                data={totalPerWeek.categoryTypes}
                cx={145}
                cy={150}
                innerRadius={75}
                outerRadius={100}
                paddingAngle={5}
                dataKey="count"
                animationBegin={10}
                animationDuration={900}
            >
                {totalPerWeek.categoryTypes.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke={"black"}
                    />
                ))}
            </Pie>
        </PieChart>
    )
}

export default TotalPerWeekCategoriesPieChart