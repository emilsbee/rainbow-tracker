// External imports
import React from 'react'

// Internal imports
import './category-list.scss'
import {CategoryType} from "../../../../store/settings/settings";

type CategoryListProps = {
    categoryTypes:CategoryType[],
    setCategory: (categoryid:string) => void,
    selectedCategoryid:string
}

function CategoryList ({categoryTypes, setCategory, selectedCategoryid}:CategoryListProps) {

    return (
        <div id="category-section-category-list-container">
            {categoryTypes.map(categoryType => {
                return (
                    <div key={categoryType.categoryid} id={"category-section-category-list-item-container"}>
                        <p
                            id={`category-section-category-list-item${categoryType.categoryid === selectedCategoryid ? "-selected" : ""}`}
                            onClick={() => setCategory(categoryType.categoryid)}
                        >
                            {categoryType.name}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}

export default CategoryList