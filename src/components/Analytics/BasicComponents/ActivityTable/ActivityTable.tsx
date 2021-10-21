// External imports
import React from "react"
import {Duration} from "luxon";

// Internal imports
import "./activity-table.scss"

type ActivityTableProps = {
    categoryTypes: {
        categoryid: string
        count: number
    }[]
    activityTypes: {
        categoryid: string
        activityid: string
        long: string
        short: string
        count: number
    }[]
    pickedCategoryid: string,
    color: string
    totalCount: number
}

const ActivityTable:React.FC<ActivityTableProps> = ({categoryTypes,activityTypes, pickedCategoryid, color, totalCount}) => {

    const totalInCategory = categoryTypes.filter(categoryType => categoryType.categoryid === pickedCategoryid).flatMap(categoryType => categoryType.count).reduce((prev, next) => prev + next)

    return (
        <table className={"analytics-activity-table-table"}>
            <thead>
                <tr>
                    <th className={"analytics-activity-table__header"} style={{textAlign: "left"}}>Activity  </th>
                    <th className={"analytics-activity-table__header"}>Hours total</th>
                    <th className={"analytics-activity-table__header"}>% of total</th>
                    <th className={"analytics-activity-table__header"}>% of category</th>
                </tr>
            </thead>

            <tbody>
                {activityTypes.map(activityType => {
                    if (activityType.categoryid === pickedCategoryid) {

                        return (
                            <tr key={activityType.activityid}>
                                <td className={"analytics-activity-table__cell"}>
                                    <div
                                        className={"analytics-activity-table__color"}
                                        style={{
                                            backgroundColor: color
                                        }}
                                    />
                                    <p className={"analytics-activity-table__long"}>
                                        {activityType.long}
                                    </p>
                                </td>

                                <td className={"analytics-activity-table__cell-count"}>
                                    {Duration.fromObject({minutes: activityType.count*15}).toFormat("h:mm")}
                                </td>

                                <td className={"analytics-activity-table__cell-count"}>
                                    {((activityType.count/totalCount)*100).toPrecision(2)}%
                                </td>

                                <td className={"analytics-activity-table__cell-count"}>
                                    {((activityType.count/totalInCategory)*100).toPrecision((activityType.count/totalInCategory)*100 === 100 ? 3 : 2)}%
                                </td>
                            </tr>
                        )
                    } else return null
                })}
            </tbody>
        </table>
    )
}

export default ActivityTable