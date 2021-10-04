// External imports
import React from "react"

// Internal imports
import './total-per-week-categories-table.scss'
import {TotalPerWeek} from "../../../../../dao/analyticsDao";
import {Duration} from "luxon";

type TotalPerWeekProps = {
    totalPerWeek: TotalPerWeek
}

const TotalPerWeekCategoriesTable = ({totalPerWeek}: TotalPerWeekProps) => {

    return (
        <table style={{width: "100%"}}>
            <tbody>
            <tr>
                <th className={"total-per-week-table__category-header"} style={{textAlign: "left"}}>Category</th>
                <th className={"total-per-week-table__category-header"}>Hours total</th>
            </tr>
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

                    <td className={"total-per-week-table__category-row__cell-count cell"}>{Duration.fromObject({minutes: categoryType.count*15}).toFormat("h:mm")}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default TotalPerWeekCategoriesTable