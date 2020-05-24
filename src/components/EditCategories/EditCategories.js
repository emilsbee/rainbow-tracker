// External imports
import React, { useState } from 'react'
import { useStoreActions } from 'easy-peasy';


// Internal imports 
import './edit-categories.scss'
import { ReactComponent as Next } from './next.svg'
import EditCategory from '../EditCategory/EditCategory'
import NewCategoryForm from '../NewCategoryForm/NewCategoryForm'


function EditCategories ({ categorySettings, activitySettings }) {
    const updateCategory = useStoreActions(actions => actions.settings.editCategory)

    const editActivity = useStoreActions(actions => actions.settings.editActivity)

    const [hoverCat, setHoverCat] = useState('')
    
    const [isInput, setIsInput] = useState(false)

    const [editCategoryid, setEditCategoryid] = useState('')




    return (
        <div className="edit-categories-container">
            <div className="edit-categories-title">
                Edit categories
            </div>
            <div className="category-container">
                <div className="category-names-list">
                    {Object.keys(categorySettings).map((key) => {
                        return (
                            <div 
                                key={key} 
                                className="category-settings-item"
                                onMouseOver={() => setHoverCat(key)}
                                onMouseLeave={() => setHoverCat('')}
                                onClick={() => setEditCategoryid(key)}
                            >
                                {categorySettings[key].category}
                                {(hoverCat === key || editCategoryid === key) && <Next className="next-icon"/>}
                            </div>
                        )
                    })}
                    {isInput && 
                        <NewCategoryForm onSubmit={updateCategory} setIsInput={setIsInput}/>
                    }   
                    <button onClick={() => setIsInput(true)} className="category-add-button">+</button>
                </div>
                {editCategoryid && 
                    <EditCategory
                        categoryid={editCategoryid} 
                        activities={activitySettings[editCategoryid] && activitySettings[editCategoryid]} 
                        closeWindow={() => setEditCategoryid('')} 
                        category={categorySettings[editCategoryid].category} 
                        color={categorySettings[editCategoryid].color}
                    />
                }
            </div>
            {/* <button onClick={editActivity}>ADD</button> */}
        </div>
    )
}

export default EditCategories