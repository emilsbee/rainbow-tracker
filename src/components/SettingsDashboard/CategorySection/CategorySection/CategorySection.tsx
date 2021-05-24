// External imports
import React from 'react'

// Internal imports 
import './category-section.scss'
import {ActivitySettings, CategorySettings} from "../../../../store/settings/settings";
import SectionTitle from "../../SectionTitle/SectionTitle";
import CategoryList from "../CategoryList/CategoryList";
import CategorySectionForm from "../CategorySectionForm/CategorySectionForm/CategorySectionForm";

type CategorySectionProps = {
    categorySettings:CategorySettings,
    activitySettings:ActivitySettings,
    setLoading:(loading:boolean) => void
}

function CategorySection ({categorySettings, activitySettings, setLoading}:CategorySectionProps) {
    const [selectedCategoryid, setSelectedCategoryid] = React.useState<string>(Object.keys(categorySettings)[0])

    return (
        <div id="category-section-container">
            <SectionTitle title={"Categories"}/>

            <div id={"category-section-content-container"}>
                <CategoryList
                    categorySettings={categorySettings}
                    setCategory={(catgoryid) => setSelectedCategoryid(catgoryid)}
                    selectedCategoryid={selectedCategoryid}
                />

                {selectedCategoryid != null &&
                    <CategorySectionForm
                        category={{categoryid:selectedCategoryid, ...categorySettings[selectedCategoryid]}}
                        categorySettings={categorySettings}
                        activitySettings={activitySettings}
                        setLoading={setLoading}
                    />
                }
            </div>
        </div>
    )
}

export default CategorySection