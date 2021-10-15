// External imports
import React from "react"
import {PieChart, Pie, Cell, Tooltip, TooltipProps} from 'recharts';

// Internal imports
import {Duration} from "luxon";
import {TotalPerWeek} from "../../../../../store/analytics";

type TotalPerWeekActivitiesPieChartProps = {
    totalPerWeek: TotalPerWeek,
    pickedCategoryid: string,
    color: string
}

const TotalPerWeekActivitiesPieChart = ({totalPerWeek, pickedCategoryid, color}: TotalPerWeekActivitiesPieChartProps) => {

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
                content={<CustomTooltip/>}
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
                                fill={entry.long === "Empty" ? "white" : color}
                                stroke={"black"}
                            />
                        )
                    } else return null
                })}
            </Pie>
        </PieChart>
    )
}

export default TotalPerWeekActivitiesPieChart