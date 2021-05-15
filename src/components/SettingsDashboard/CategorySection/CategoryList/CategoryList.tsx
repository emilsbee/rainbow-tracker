// External imports
import React from 'react'

// Internal imports
import './category-list.scss'
import {CategorySettings} from "../../../../store/settings/settings";
import {getCategoryidByName} from "../../../../store/categories/helpers";

type CategoryListProps = {
    categorySettings:CategorySettings,
    setCategory: (categoryid:string) => void,
    selectedCategoryid:string
}

function CategoryList ({categorySettings, setCategory, selectedCategoryid}:CategoryListProps) {

    return (
        <div id="category-section-category-list-container">
            {Object.values(categorySettings).map(categorySetting => {

                return(
                    <div key={categorySetting.category} id="category-section-category-list-item-container">
                        <p
                            id={`category-section-category-list-item${getCategoryidByName(categorySetting.category, categorySettings) === selectedCategoryid ? "-selected" : ""}`}
                            onClick={() => setCategory(getCategoryidByName(categorySetting.category, categorySettings))}
                        >
                            {categorySetting.category}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}

export default CategoryList