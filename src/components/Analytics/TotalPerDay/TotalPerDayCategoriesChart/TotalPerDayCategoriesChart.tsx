// External imports
import React from "react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Rectangle, TooltipProps,
} from 'recharts';

// Internal imports
import {useStoreState} from "../../../../store/hookSetup";
import {Duration, Info} from "luxon";
import {TotalPerDay} from "../../../../store/analytics";

type TotalPerDayCategoriesChartProps = {
    totalPerDay: TotalPerDay[]
}

const TotalPerDayCategoriesChart = ({totalPerDay}: TotalPerDayCategoriesChartProps) => {
    const categoryTypes = useStoreState(state => state.settings.categoryTypes)

    const formatData = (totalPerDay: TotalPerDay[]) => {
        let data = []

        for (let i = 0; i < totalPerDay.length; i++) {
            let obj: any = {
                weekDay: Info.weekdays()[i]
            }
            for (let j = 0; j < totalPerDay[i].categories.length; j++) {
                let categoryName = totalPerDay[i].categories[j].name

                obj[categoryName] = totalPerDay[i].categories[j].count
            }
            data.push(obj)
        }

        return data
    }

    const CustomCursor = (props:any) => {

        const { x, y, width, height, top } = props;
        return <Rectangle fill="black" stroke="black" x={x} y={y+top-13} width={width} height={height-9} radius={5}/>;
    }

    const CustomTooltip = ({ payload, active}: TooltipProps<number, string>) => {
        if (active && payload && payload.length) {

            return (
                <div className="custom-tooltip">
                    {payload.map(entry => (
                        <p style={{color: entry.color}}>
                            {entry.dataKey}: {entry.value && Duration.fromObject({minutes: entry.value*15}).toFormat("h:mm")}h
                        </p>
                    ))}
                </div>
            );
        } else return null
    }


    return (
        <div style={{width: "800px", height: "500px"}}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={formatData(totalPerDay)}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey="weekDay" stroke={"white"}/>
                    <YAxis />
                    <Tooltip
                        content={<CustomTooltip />}
                        animationDuration={100}
                        contentStyle={{backgroundColor: "white", borderRadius: "7px"}}
                        // cursor={<CustomCursor />}
                        cursor={false}
                    />
                    <Legend />
                    {categoryTypes.map(categoryType => {
                        if (categoryType.categoryid) {
                            return (
                                <Bar
                                    key={categoryType.categoryid}
                                    dataKey={categoryType.name}
                                    stackId="a"
                                    fill={categoryType.color}
                                />
                            )
                        }
                    })}
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default TotalPerDayCategoriesChart