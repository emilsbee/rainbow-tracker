// External imports
import React from "react"
import {Duration} from "luxon";

// Internal imports
import "./category-table.scss"

type CategoryTableProps = {
    categoryTypes: {
        categoryid: string
        color: string
        name: string
        count: number
    }[]
    totalCount: number
}

const CategoryTable:React.FC<CategoryTableProps> = ({categoryTypes, totalCount}) => {

    return (
        <table className={"analytics-category-table"}>

            <thead>
                <tr>
                    <th className={"analytics-category-table__header"} style={{textAlign: "left"}}>Category</th>
                    <th className={"analytics-category-table__header"}>Hours</th>
                    <th className={"analytics-category-table__header"}>% of total</th>
                </tr>
            </thead>

            <tbody>
                {categoryTypes.map(categoryType => (
                    <tr key={categoryType.categoryid}>
                        <td className={"analytics-category-table__cell"}>
                            <div
                                className={"analytics-category-table__color"}
                                style={{
                                    backgroundColor: categoryType.color
                                }}
                            />

                            {categoryType.name}
                        </td>

                        <td className={"analytics-category-table__cell-count"}>
                            {Duration.fromObject({minutes: categoryType.count*15}).toFormat("h:mm")}
                        </td>

                        <td className={"analytics-category-table__cell-count"}>
                            {((categoryType.count/totalCount)*100).toPrecision(2)}%
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default CategoryTable