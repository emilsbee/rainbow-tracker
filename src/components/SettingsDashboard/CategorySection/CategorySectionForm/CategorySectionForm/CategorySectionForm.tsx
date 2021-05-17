// External imports
import React from "react";

// Internal imports
import {ActivitySettings, CategorySettings} from "../../../../../store/settings/settings";
import Section from "../Section/Section";
import './category-section-form.scss'
import ActivityList from "../ActivityList/ActivityList";
import {validateCategorySubmission} from "../../../../../store/categories/helpers";
import {categorySettings} from "../../../../../utils/staticData";

type CategorySectionFormProps = {
    category: { category:string, color:string, categoryid:string},
    categorySettings:CategorySettings,
    activitySettings:ActivitySettings
}

function CategorySectionForm ({category, activitySettings, categorySettings}:CategorySectionFormProps) {
    const [colorValue, setColorValue] = React.useState(category.color)
    const [nameValue, setNameValue] = React.useState(category.category)
    const [localActivitySettings, setLocalActivitySettings] = React.useState<ActivitySettings>(activitySettings)

    const [error, setError] = React.useState({message:"", category:true})

    React.useEffect(() => {
        setColorValue(category.color)
        setNameValue(category.category)
    }, [category.category, category.categoryid, category.color])

    /**
     * Handles press on save button.
     */
    const handleFormSubmit = ():void => {

        const {valid, message} = validateCategorySubmission(category.categoryid, nameValue, colorValue, categorySettings)

        if (!valid) {
            setError({message, category: true})
        } else {
            if (error.message.length !== 0 && error.category) {
                setError({message: "", category: true})
            }
        }
    }

    return (
        <div id={"category-section-form-container"}>
            <div id={"category-section-form-error"}>
                {error.message}
            </div>
            <Section title="Name">
                <input type={"text"} id={"category-name"} value={nameValue} onChange={e => setNameValue(e.target.value)} maxLength={18}/>
            </Section>
            <Section title="Color">
                <div id={"color-section-container"}>
                    <div style={{backgroundColor: colorValue}} id={"color-section-color"}/>
                    <input type="text" id="category-color" value={colorValue} onChange={e => setColorValue(e.target.value)} maxLength={7}/>
                </div>
            </Section>
            <Section title={"Activities"}>
                <ActivityList
                    activitySettings={localActivitySettings}
                    setActivitySettings={setLocalActivitySettings}
                    categoryid={category.categoryid}
                    setError={setError}
                />
            </Section>
            <Section title={""}>
                <button id={"category-section-form-save-button"} onClick={handleFormSubmit}>Save</button>
            </Section>
        </div>
    )
}

export default CategorySectionForm