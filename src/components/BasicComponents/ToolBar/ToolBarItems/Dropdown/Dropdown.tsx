// External imports
import React from "react"

// Internal imports
import './dropdown.scss'

type DropdownProps = {
    label: string,
    options: (string | number)[],
    onSelect: (option: string | number, selectedIndex: number) => void,
    selected: string | number,
    styleSelect?:  React.CSSProperties,
    text?: string[]
}

const Dropdown = ({label, options, onSelect, selected, styleSelect, text}: DropdownProps) => {
    
    return (
        <div className={"tool-bar-item__dropdown"}>
            <label className={"tool-bar-item__label"} htmlFor="dropdown">{label}</label>
            <select
                style={styleSelect}
                value={selected}
                className={"tool-bar-item__dropdown__select"}
                name="dropdown"
                onChange={(e) => onSelect(e.target.value, e.target.selectedIndex)}
            >
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {text ? text[index] : option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Dropdown