// External imports
import React from 'react'

// Internal imports
import './category-list.scss'
import {CategoryType} from "../../../../store/settings/settings";
import {ReactComponent as Add} from "../../../../svgIcons/add.svg"
import {useStoreActions, useStoreState} from "../../../../store/hookSetup";
import {createCategory} from "../../../../dao/settingsDao";

type CategoryListProps = {
    categoryTypes:CategoryType[],
    setCategory: (categoryid:string) => void,
    selectedCategoryid:string
}

function CategoryList ({categoryTypes, setCategory, selectedCategoryid}:CategoryListProps) {
    // Store actions
    const setCategoryTypes = useStoreActions(actions => actions.settings.setCategoryTypes)

    // Store state
    const userid = useStoreState(state => state.auth.uid)

    // Local state
    const [newCategory, setNewCategory] = React.useState<boolean>(false)
    const [newCategoryName, setNewCategoryName] = React.useState<string>("")

    const handleKeyPress = async (e:KeyboardEvent) => {
        if (e.key === "Escape") {
            setNewCategory(false)
            setNewCategoryName("")
        }
    }

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()

        if (newCategory && newCategoryName.length > 0) {
            let categoryType = await createCategory(userid, newCategoryName, "#CBC3E3")
            setCategoryTypes({categoryTypes: [...categoryTypes, categoryType]})
            setCategory(categoryType.categoryid)
            setNewCategory(false)
            setNewCategoryName("")
        }
    }

    React.useEffect(() => {
        document.addEventListener("keydown", handleKeyPress, false);


        return () => {
            document.removeEventListener("keydown", handleKeyPress, false);
        }
    }, [])

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

            {newCategory &&
                <form onSubmit={handleSubmit}>
                    <input
                        autoFocus={true}
                        type={"text"}
                        value={newCategoryName}
                        onChange={e => setNewCategoryName(e.target.value)}
                        className={"category-section-category-list-add-input"}
                    />
                </form>
            }

            {!newCategory &&
                <Add height={16} width={16} fill={"white"} className={"category-section-category-list-add"} onClick={() => setNewCategory(true)}/>
            }
        </div>
    )
}

export default CategoryList