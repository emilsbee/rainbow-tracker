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

    const addActivity = useStoreActions(actions => actions.settings.addActivity)

    const [hoverCat, setHoverCat] = useState('')
    
    const [isInput, setIsInput] = useState(false)

    const [editCategory, setEditCategory] = useState('')


    

    return (
        <div className="edit-categories-container">
            <div className="edit-categories-title">
                Edit categories
            </div>
            <div className="category-container">
                <div className="category-names-list">
                    {Object.keys(categorySettings).map((category) => {
                        return (
                            <div 
                                key={category} 
                                className="category-settings-item"
                                onMouseOver={() => setHoverCat(category)}
                                onMouseLeave={() => setHoverCat('')}
                                onClick={() => setEditCategory(category)}
                            >
                                {category}
                                {hoverCat === category && <Next className="next-icon"/>}
                            </div>
                        )
                    })}
                    {isInput && 
                        <NewCategoryForm onSubmit={updateCategory} setIsInput={setIsInput}/>
                    }   
                    <button onClick={() => setIsInput(true)} className="category-add-button">+</button>
                </div>
                {editCategory && 
                    <EditCategory 
                        activities={activitySettings[editCategory] && activitySettings[editCategory]} 
                        closeWindow={() => setEditCategory('')} 
                        category={editCategory} 
                        color={categorySettings[editCategory]}
                    />
                }
            </div>
            {/* <button onClick={addActivity}>ADD</button> */}
        </div>
    )
}

export default EditCategories