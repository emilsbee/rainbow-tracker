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
            <tbody>
            {totalPerWeek.categoryTypes.map(categoryType => {
                console.log(categoryType)
                if (!totalPerWeek.activityTypes.find(el => el.categoryid === categoryType.categoryid)) { // If the current category doesn't have any activities
                    return (
                        <tr key={categoryType.categoryid}>
                            <td className={"total-per-week-table__category-row__cell cell"}>{categoryType.name}</td>
                            <td className={"total-per-week-table__category-row__cell-count cell"}>{categoryType.count}</td>
                        </tr>
                    )
                } else { // If the current category does have activities

                    return (
                        <>
                            {totalPerWeek.activityTypes.map((activityType, index) => {
                                console.log(activityType)
                                if (index === 0) { // Render the category before all its activities
                                    return (
                                        <tr key={categoryType.categoryid}>
                                            <td className={"total-per-week-table__category-row__cell cell"}>{categoryType.name}</td>
                                            <td className={"total-per-week-table__category-row__cell-count cell"}>{categoryType.count}</td>
                                        </tr>
                                    )
                                } else if (activityType.categoryid === categoryType.categoryid) {
                                    return (
                                        <tr key={activityType.activityid}>
                                            <td className={"total-per-week-table__activity-row__cell cell"}>{activityType.long}</td>
                                            <td className={"total-per-week-table__activity-row__cell-count cell"}>{activityType.count}</td>
                                        </tr>
                                    )
                                }
                            })}
                        </>
                    )
                }
            })}
            </tbody>
        </table>
    )
}

export default TotalPerWeekComponent