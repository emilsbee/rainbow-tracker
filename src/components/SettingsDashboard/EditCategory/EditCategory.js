// External imports
import React, { useState, useEffect } from 'react'
import EditColorPicker from '../EditColorPicker/EditColorPicker'
import { useStoreActions } from 'easy-peasy'


// Internal imports 
import EditActivity from '../EditActivity/EditActivity'
import { ReactComponent as Trash } from './trash.svg'
import './edit-category.scss'

const EditCategory  = ({ category, closeWindow, color, activities, categoryid }) => {
    const editCategory = useStoreActions(actions => actions.settings.editCategory)
    const editActivity = useStoreActions(actions => actions.settings.editActivity)

    const [localColor, setLocalColor] = useState(color)
    const [localCategory, setLocalCategory] = useState(category)
    
    const [colorPicker, toggleColorPicker] = useState(false)

    useEffect(() => {
        setLocalColor(color)
    }, [color])

    useEffect(() => {
        setLocalCategory(category)
    }, [category]   )

    const submitLocalCategory = (e) => {
        e.preventDefault()
        editCategory({
            type: 'UPDATE',
            categoryObj: {
                category: localCategory,
                color: localColor,
            },
            categoryid
        })
    }

    const handleSetLocalColor = (color) => {
        setLocalColor(color)
        editCategory({
            type: 'UPDATE',
            categoryObj: {
                category: localCategory,
                color,
            },
            categoryid
        })
    }

    const handleAddCategory = () => {
        editActivity({
            type: 'ADD',
            categoryid,
            activityObj: {
                short: "",
                long: ""
            }
        })
    }

    const handleRemoveCategory = () => {
        closeWindow()
        editCategory({
            type:'REMOVE',
            categoryid
        })
    }

    return (
        <div className="edit-category-container">
            <Trash onClick={handleRemoveCategory} className="edit-category-trash-icon"/>
            <div className="edit-category-name">
                <div className="edit-category-name-label">
                    category name
                </div>     
                <form onBlur={submitLocalCategory} onSubmit={submitLocalCategory}>
                    <input 
                        spellCheck="false"
                    
                        className="edit-category-name-input" 
                        value={localCategory}
                        onChange={(e) => setLocalCategory(e.target.value)}
                        maxLength="15"
                    />
                </form>
            </div>
            <div className="edit-category-box-color">
                <div className="edit-category-name-label">
                    box color
                </div>
                <div className="edit-category-color-square" style={{"backgroundColor":localColor}} onClick={() => toggleColorPicker(true)}>

                </div>
                {colorPicker && 
                    <EditColorPicker 
        
                        localColor={localColor} 
                        setLocalColor={handleSetLocalColor} 
                        toggleColorPicker={toggleColorPicker}
                    />
                }   
            </div>
            <div className="edit-category-activities">
                <div className="edit-category-name-label">
                    activities     
                </div>
                <div className="edit-category-activity-list">
                    
                        {
                        
                        activities && 
                        <div className="edit-category-activities-list-items">
                            {Object.keys(activities).map((activityid) => {
                                    return <EditActivity 
                                                removeActivity={editActivity}
                                                key={activityid}
                                                short={activities[activityid].short}
                                                long={activities[activityid].long}
                                                editActivity={editActivity}
                                                categoryid={categoryid}
                                                activityid={activityid}
                                        />
                                })}
                            </div>
                        }
                        <div className="edit-category-activities-banner">
                            <button onClick={handleAddCategory} className="edit-category-activity-add-button">+</button>
                        </div>    
                </div>
            </div>
        </div>
    )
}

export default EditCategory