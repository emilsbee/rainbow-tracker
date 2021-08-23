// External imports
import React from "react"

// Internal imports
import './dropdown.scss'

type DropdownProps = {
    label: string,
    options: (string | number)[],
    onSelect: (option: string | number) => void,
    selected: number
}

const Dropdown = ({label, options, onSelect, selected}: DropdownProps) => {

    return (
        <div className={"tool-bar-item__dropdown"}>
            <label className={"tool-bar-item__label"} htmlFor="dropdown">{label}</label>
            <select className={"tool-bar-item__dropdown__select"} name="dropdown" onChange={(e) => onSelect(e.target.value)}>
                {options.map(option => (
                    <option key={option} value={option} selected={selected === option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Dropdown