// External imports
import React from 'react'

// Internal imports 
import './category-section.scss'
import {ActivitySettings, CategorySettings} from "../../../../store/settings/settings";
import SectionTitle from "../../SectionTitle/SectionTitle";
import CategoryList from "../CategoryList/CategoryList";

type CategorySectionProps = {
    categorySettings:CategorySettings,
    activitySettings:ActivitySettings
}

function CategorySection ({categorySettings, activitySettings}:CategorySectionProps) {
    const [selectedCategoryid, setSelectedCategoryid] = React.useState<string>(null)

    return (
        <div id="category-section-container">
            <SectionTitle title={"Categories"}/>

            <CategoryList categorySettings={categorySettings} setCategory={(catgoryid) => setSelectedCategoryid(catgoryid)} selectedCategoryid={selectedCategoryid}/>
        </div>
    )
}

export default CategorySection