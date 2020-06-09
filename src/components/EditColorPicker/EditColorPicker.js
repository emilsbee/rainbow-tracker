// External imports
import React from 'react'
import { TwitterPicker } from 'react-color';
import onClickOutside from "react-onclickoutside";

// Internal imports 
import './edit-color.scss'


function EditColorPicker ({ localColor, setLocalColor, toggleColorPicker }) {
  
    EditColorPicker.handleClickOutside = () => {
        toggleColorPicker(false)
    }

    const handleColorChange = (color) => {
        setLocalColor(color.hex)
        toggleColorPicker(false)
    }

    return (
        <div className="category-color-picker">
            <TwitterPicker color={localColor} onChangeComplete={handleColorChange} triangle="top-left"/>
        </div>  
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => EditColorPicker.handleClickOutside
}

export default onClickOutside(EditColorPicker, clickOutsideConfig) 