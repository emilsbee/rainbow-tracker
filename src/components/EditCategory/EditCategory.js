// External imports
import React, { useState, useEffect } from 'react'
import EditColorPicker from '../EditColorPicker/EditColorPicker'


// Internal imports 
import './edit-category.scss'
import { useStoreActions } from 'easy-peasy'

const EditCategory  = ({ category, closeWindow, color, activities }) => {
    const editCategory = useStoreActions(actions => actions.settings.editCategory)
    const updateActivity = useStoreActions(actions => actions.settings.updateActivity)

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
            category: localCategory,
            color: localColor
        })
    }

    return (
        <div className="edit-category-container">
            <div className="edit-category-name">
                <div className="edit-category-name-label">
                    category name
                </div>     
                <form onBlur={submitLocalCategory} onSubmit={submitLocalCategory}>
                    <input 
                        spellcheck="false"
                        ref={input => input && input.focus()} 
                        autoFocus={true} 
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
                    <EditColorPicker localColor={localColor} setLocalColor={setLocalColor} toggleColorPicker={toggleColorPicker}/>
                }   
            </div>
            <div className="edit-category-activities">
                <div className="edit-category-name-label">
                    activities     
                </div>
                <div className="edit-category-activity-list">
                    <form>
                        {activities ? Object.keys(activities).map((activity) => {
                                return (
                                    <div className="edit-category-activities-items">
                                        <input spellcheck="false" maxLength="2"  key={activity} value={activity} className="edit-category-activity-list-short"/>
                                        :
                                        <textarea spellcheck="false" key={activities[activity]} value={activities[activity]} className="edit-category-activity-list-long"/>
                                    </div>
                                )
                            })
                        :
                        <div className="edit-category-activities-banner">
                            No activities
                        </div>    
                        }
                    </form>
                </div>
            </div>
            {/* <div className="edit-category-buttons">
                <button onClick={closeWindow}>Cancel</button>
                <button>Save</button>
            </div> */}
        </div>
    )
}

export default EditCategory