// External imports
import React, { useState } from 'react'
import onClickOutside from "react-onclickoutside";

// Internal imports 
import './new-category-form.scss'

function NewCategoryForm  ({ onSubmit,setIsInput }) {
    const [localCategoryName, setLocalCategoryName] = useState('')

    const handleCategorySubmit = (e) => {
        e.preventDefault()
        onSubmit({
            type: 'ADD',
            category: localCategoryName,
        })
        setIsInput(false)
        setLocalCategoryName('')
    }

    NewCategoryForm.handleClickOutside = () => {
        setIsInput(false)
    }

 

    return (
        <div>
            <form onSubmit={handleCategorySubmit} className="new-category-form">
                <input 
                    onChange={(e) => setLocalCategoryName(e.target.value)  } 
                    className="new-category-input"
                    placeholder="category name..."
                    autoFocus
                    maxlength="15"
                />
            </form>
        </div>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => NewCategoryForm.handleClickOutside
}

export default onClickOutside(NewCategoryForm, clickOutsideConfig) 