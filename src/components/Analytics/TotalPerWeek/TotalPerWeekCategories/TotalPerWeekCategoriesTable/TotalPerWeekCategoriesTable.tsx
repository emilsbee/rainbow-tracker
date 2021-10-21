// External imports
import React from "react"
import {Duration} from "luxon";

// Internal imports
import './total-per-week-categories-table.scss'
import {TotalPerWeek} from "../../../../../store/analytics";

type TotalPerWeekProps = {
    totalPerWeek: TotalPerWeek
    totalCount: number
}

const TotalPerWeekCategoriesTable:React.FC<TotalPerWeekProps> = ({totalPerWeek, totalCount}) => {

    return (
        <table style={{width: "100%"}}>
            <tbody>
            <tr>
                <th className={"total-per-week-table__category-header"} style={{textAlign: "left"}}>Category</th>
                <th className={"total-per-week-table__category-header"}>Hours</th>
                <th className={"total-per-week-table__category-header"}>% of time</th>
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

                    <td className={"total-per-week-table__category-row__cell-count cell"}>
                        {Duration.fromObject({minutes: categoryType.count*15}).toFormat("h:mm")}
                    </td>

                    <td className={"total-per-week-table__category-row__cell-count cell"}>
                        {((categoryType.count/totalCount)*100).toPrecision(2)}%
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default TotalPerWeekCategoriesTable