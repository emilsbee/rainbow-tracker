// External imports
import React from "react";

// Internal imports
import {ActivitySettings, CategorySettings} from "../../../../../store/settings/settings";
import Section from "../Section/Section";
import './category-section-form.scss'
import ActivityList from "../ActivityList/ActivityList";
import {validateCategorySubmission} from "../../../../../store/categories/helpers";
import {categorySettings} from "../../../../../utils/staticData";
import {useStoreActions, useStoreState} from "../../../../../store/hookSetup";
import {saveSettings} from "../../../../../store/settings/helpers";

type CategorySectionFormProps = {
    category: { category:string, color:string, categoryid:string},
    categorySettings:CategorySettings,
    activitySettings:ActivitySettings,
    setLoading: (loading:boolean) => void
}

function CategorySectionForm ({category, activitySettings, categorySettings, setLoading}:CategorySectionFormProps) {
    // Store actions
    const setCategorySettings = useStoreActions(actions => actions.settings.setCategorySettings)

    // Store state
    const uid = useStoreState(state => state.auth.uid)

    // Local state
    const [colorValue, setColorValue] = React.useState(category.color)
    const [nameValue, setNameValue] = React.useState(category.category)
    const [localActivitySettings, setLocalActivitySettings] = React.useState<ActivitySettings>(activitySettings)
    const [error, setError] = React.useState({message:""})
    const [activityError, setActivityError] = React.useState({message:""})

    React.useEffect(() => {
        setColorValue(category.color)
        setNameValue(category.category)
    }, [category.category, category.categoryid, category.color])

    /**
     * Handles press on save button.
     */
    const handleFormSubmit = async ():Promise<void> => {
        const {valid, message} = validateCategorySubmission(category.categoryid, nameValue, colorValue, categorySettings)

        if (valid && activityError.message.length === 0) {
            categorySettings[category.categoryid].category = nameValue
            categorySettings[category.categoryid].color = colorValue
            setCategorySettings({categorySettings})
            setLoading(true)
            saveSettings(activitySettings, categorySettings, uid)
                .then(() => {
                    setError({message: ""})
                    setLoading(false)
                })
                .catch(e => {
                    console.error(e)
                    setError({message: "Failed to save settings to Firebase."})
                    setLoading(false)
                })

        } else if (!valid) {
            setError({message})
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
            <div id={"category-section-form-error"}>
                {activityError.message}
            </div>
            <Section title={"Activities"}>
                <ActivityList
                    categoryid={category.categoryid}
                    setError={setActivityError}
                    activitySettings={activitySettings}
                />
            </Section>
            <Section title={""}>
                <button id={"category-section-form-save-button"} onClick={handleFormSubmit}>Save</button>
            </Section>
        </div>
    )
}

export default CategorySectionForm