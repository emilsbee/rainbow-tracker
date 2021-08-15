// External imports
import React from "react"

// Internal imports
import './total-per-week-component.scss'
import {TotalPerWeek} from "../../../dao/analytics/analyticsDao";

type TotalPerWeekProps = {
    totalPerWeek: TotalPerWeek
}

const TotalPerWeekComponent = ({totalPerWeek}: TotalPerWeekProps) => {

    return (
        <table>
            {totalPerWeek.categoryTypes.map(categoryType => (
                <>
                    {totalPerWeek.activityTypes.map((activityType, index) => {

                        if (index === 0) {
                            return (
                                <tr>
                                    <td className={"total-per-week-table__category-row__cell cell"}>{categoryType.name}</td>
                                    <td className={"total-per-week-table__category-row__cell-count cell"}>{categoryType.count}</td>
                                </tr>
                            )
                        } else if (activityType.categoryid === categoryType.categoryid) {
                            return (
                                <tr>
                                    <td className={"total-per-week-table__activity-row__cell cell"}>{activityType.long}</td>
                                    <td className={"total-per-week-table__activity-row__cell-count cell"}>{activityType.count}</td>
                                </tr>
                            )
                        }
                    })}
                </>
            ))}
        </table>
    )
}

export default TotalPerWeekComponent