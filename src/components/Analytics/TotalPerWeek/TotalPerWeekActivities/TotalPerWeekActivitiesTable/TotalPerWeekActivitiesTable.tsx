// External imports
import React from "react"

// Internal imports
import "../../TotalPerWeekCategories/TotalPerWeekCategoriesTable/total-per-week-categories-table.scss"
import {Duration} from "luxon";
import {TotalPerWeek} from "../../../../../store/analytics";

type TotalPerWeekActivitiesTableProps = {
    totalPerWeek: TotalPerWeek,
    pickedCategoryid: string,
    color: string
    totalCount: number
}

const TotalPerWeekActivitiesTable:React.FC<TotalPerWeekActivitiesTableProps> = ({totalPerWeek, pickedCategoryid, color, totalCount}) => {

    const totalInCategory = totalPerWeek.categoryTypes.filter(categoryType => categoryType.categoryid === pickedCategoryid).flatMap(categoryType => categoryType.count).reduce((prev, next) => prev + next)

    return (
        <table style={{width: "100%"}}>
            <tbody>
            <tr>
                <th className={"total-per-week-table__category-header"} style={{textAlign: "left"}}>Activity  </th>
                <th className={"total-per-week-table__category-header"}>Hours total</th>
                <th className={"total-per-week-table__category-header"}>% of total time</th>
                <th className={"total-per-week-table__category-header"}>% of category time</th>
            </tr>
            {totalPerWeek.activityTypes.map(activityType => {
                if (activityType.categoryid === pickedCategoryid) {

                    return (
                        <tr key={activityType.activityid}>
                            <td className={"total-per-week-table__category-row__cell cell"}>
                                <div
                                    className={"total-per-week-table__category-color"}
                                    style={{
                                        backgroundColor: color
                                    }}
                                />
                                <p style={{margin: 0, wordWrap: "break-word", wordBreak: "break-word", maxWidth: 200}}>
                                    {activityType.long}
                                </p>
                            </td>

                            <td className={"total-per-week-table__category-row__cell-count cell"}>
                                {Duration.fromObject({minutes: activityType.count*15}).toFormat("h:mm")}
                            </td>

                            <td className={"total-per-week-table__category-row__cell-count cell"}>
                                {((activityType.count/totalCount)*100).toPrecision(2)}%
                            </td>

                            <td className={"total-per-week-table__category-row__cell-count cell"}>
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

export default TotalPerWeekActivitiesTable


