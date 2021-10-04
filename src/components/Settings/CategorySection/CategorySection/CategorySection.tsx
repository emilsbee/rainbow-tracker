// External imports
import React from 'react'

// Internal imports 
import './category-section.scss'
import {ActivityType, CategoryType} from "../../../../store/settings/settings";
import SectionTitle from "../../SectionTitle/SectionTitle";
import CategoryList from "../CategoryList/CategoryList";
import CategorySectionForm from "../CategorySectionForm/CategorySectionForm/CategorySectionForm";

type CategorySectionProps = {
    categoryTypes:CategoryType[],
    activityTypes:ActivityType[],
    setLoading:(loading:boolean) => void
}

function CategorySection ({categoryTypes, activityTypes, setLoading}:CategorySectionProps) {
    const [selectedCategoryid, setSelectedCategoryid] = React.useState<string>(categoryTypes.length === 0 ? "" : categoryTypes[0].categoryid)

    const findCategoryForForm = ():CategoryType => {
        for (let i = 0; i < categoryTypes.length; i++) {
            if (categoryTypes[i].categoryid === selectedCategoryid) {
                return categoryTypes[i]
            }
        }

        return {categoryid: "", userid: "", color: "", name: "", archived: false}
    }

    const resetSelectedCategoryid = ():void => {
        if (categoryTypes.length > 0) {
            setSelectedCategoryid(categoryTypes[0].categoryid)
        }
    }

    return (
        <div id="category-section-container">
            <SectionTitle title={"Categories"}/>

            <div id={"category-section-content-container"}>
                <CategoryList
                    categoryTypes={categoryTypes}
                    setCategory={(categoryid) => setSelectedCategoryid(categoryid)}
                    selectedCategoryid={selectedCategoryid}
                />

                {selectedCategoryid.length !== 0 &&
                    <CategorySectionForm
                        resetSelectedCategoryid={resetSelectedCategoryid}
                        category={findCategoryForForm()}
                        activityTypes={activityTypes}
                        setLoading={setLoading}
                    />
                }
            </div>
        </div>
    )
}

export default CategorySection