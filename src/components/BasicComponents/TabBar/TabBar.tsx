// External imports
import React from "react"

// Internal imports
import "./tab-bar.scss"

type TabBarProps = {
    tabs: string[],
    selectedIndex: number,
    onSelect: (selected: number) => void
}

const TabBar = ({tabs, onSelect, selectedIndex}: TabBarProps) => {

    return (
        <div className={"tab-bar"}>
            {tabs.map((tab, index) => (
                <h3 key={tab} onClick={() => onSelect(index)} className={`tab-bar-item ${selectedIndex === index ? "selected-item" : ""}`}>
                    {tab}
                </h3>
            ))}
        </div>
    )
}

export default TabBar