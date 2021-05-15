// External imports
import React from "react";

// Internal imports
import {ActivitySettings, CategorySettings} from "../../../../../store/settings/settings";
import Section from "../Section/Section";
import './category-section-form.scss'
import ActivityList from "../ActivityList/ActivityList";

type CategorySectionFormProps = {
    category: { category:string, color:string, categoryid:string},
    categorySettings:CategorySettings,
    activitySettings:ActivitySettings
}

function CategorySectionForm ({category, categorySettings, activitySettings}:CategorySectionFormProps) {
    const [colorValue, setColorValue] = React.useState(category.color)
    const [nameValue, setNameValue] = React.useState(category.category)

    React.useEffect(() => {
        setColorValue(category.color)
        setNameValue(category.category)
    }, [category.category, category.categoryid, category.color])

    return (
        <div id={"category-section-form-container"}>
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
                <ActivityList activitySettngs={activitySettings} categoryid={category.categoryid}/>
            </Section>
        </div>
    )
}

export default CategorySectionForm