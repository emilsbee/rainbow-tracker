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

    const [hoverCat, setHoverCat] = useState('')
    
    const [isInput, setIsInput] = useState(false)

    const [editCategoryid, setEditCategoryid] = useState('')




    return (
        <div className="edit-categories-container">
                        <div className="settings-dashboard-title">
                Settings
            </div>
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
                                style={{"color": editCategoryid === key && 'hsl(89, 68%, 28%)'}}                          
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