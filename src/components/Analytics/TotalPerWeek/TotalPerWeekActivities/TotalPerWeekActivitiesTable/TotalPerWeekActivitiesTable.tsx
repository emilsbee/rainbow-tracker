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
}

const TotalPerWeekActivitiesTable = ({totalPerWeek, pickedCategoryid, color}: TotalPerWeekActivitiesTableProps) => {

    return (
        <table style={{width: "100%"}}>
            <tbody>
            <tr>
                <th className={"total-per-week-table__category-header"} style={{textAlign: "left"}}>Activity  </th>
                <th className={"total-per-week-table__category-header"}>Hours total</th>
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
                                {activityType.long}
                            </td>

                            <td className={"total-per-week-table__category-row__cell-count cell"}>{Duration.fromObject({minutes: activityType.count*15}).toFormat("h:mm")}</td>
                        </tr>
                    )
                } else return null
            })}
            </tbody>
        </table>
    )
}

export default TotalPerWeekActivitiesTable


