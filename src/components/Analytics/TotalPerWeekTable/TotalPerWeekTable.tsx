// External imports
import React from "react"

// Internal imports
import './total-per-week-table.scss'
import {TotalPerWeek} from "../../../dao/analytics/analyticsDao";

type TotalPerWeekProps = {
    totalPerWeek: TotalPerWeek
}

const TotalPerWeekTable = ({totalPerWeek}: TotalPerWeekProps) => {

    return (
        <table style={{width: "100%"}}>
            <tbody>
            {totalPerWeek.categoryTypes.map(categoryType => (
                <tr key={categoryType.categoryid}>
                    <td className={"total-per-week-table__category-row__cell cell"}>
                        <div
                            className={"total-per-week-table__category-color"}
                            style={{
                                backgroundColor: categoryType.color
                            }}
                        />
                        {categoryType.name}
                    </td>
                    <td className={"total-per-week-table__category-row__cell-count cell"}>{categoryType.count}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default TotalPerWeekTable