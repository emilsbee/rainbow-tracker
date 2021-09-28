// External imports
import React from "react";

// Internal imports
import {ActivityType, CategoryType} from "../../../../../store/settings/settings";
import Section from "../Section/Section";
import './category-section-form.scss'
import ActivityList from "../../../ActivityList/ActivityList";
import {validateCategorySubmission} from "../../../../../store/categories/helpers";
import {useStoreActions} from "../../../../../store/hookSetup";

type CategorySectionFormProps = {
    category: CategoryType,
    activityTypes: ActivityType[],
    setLoading: (loading: boolean) => void
}

function CategorySectionForm({category, activityTypes, setLoading}: CategorySectionFormProps) {
    // Store actions
    const updateCategoryType = useStoreActions(actions => actions.settings.updateCategoryType)

    // Local state
    const [colorValue, setColorValue] = React.useState(category.color)
    const [nameValue, setNameValue] = React.useState(category.name)
    const [error, setError] = React.useState({message: ""})
    const [activityError, setActivityError] = React.useState({message: ""})

    React.useEffect(() => {
        setColorValue(category.color)
        setNameValue(category.name)
    }, [category.name, category.categoryid, category.color])

    /**
     * Handles press on save button.
     */
    const handleFormSubmit = async (): Promise<void> => {
        const { valid, message } = validateCategorySubmission(category.categoryid, nameValue, colorValue)

        if (valid && activityError.message.length === 0) {
            setLoading(true)

            await updateCategoryType({
                categoryType: {
                    userid: category.userid,
                    categoryid: category.categoryid,
                    name: nameValue,
                    color: colorValue,
                    archived: category.archived
                }})

            setLoading(false)
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
                <input type={"text"} id={"category-name"} value={nameValue} onChange={e => setNameValue(e.target.value)}
                       maxLength={18}/>
            </Section>
            <Section title="Color">
                <div id={"color-section-container"}>
                    <div style={{backgroundColor: colorValue}} id={"color-section-color"}/>
                    <input type="text" id="category-color" value={colorValue}
                           onChange={e => setColorValue(e.target.value)} maxLength={7}/>
                </div>
            </Section>
            <div id={"category-section-form-error"}>
                {activityError.message}
            </div>
            <Section title={"Activities"}>
                <ActivityList
                    categoryid={category.categoryid}
                    setError={setActivityError}
                    activityTypes={activityTypes}
                />
            </Section>
            <Section title={""}>
                <button className={"button"} onClick={handleFormSubmit}>Save</button>
            </Section>
        </div>
    )
}

export default CategorySectionForm