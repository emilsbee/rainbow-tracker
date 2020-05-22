// External imports
import React, { useState } from 'react'
import onClickOutside from "react-onclickoutside";

// Internal imports
import './year-dropdown.scss'
import { ReactComponent as Up } from '../WeekDropdown/utils/up.svg'
import { ReactComponent as Down } from '../WeekDropdown/utils/down.svg'
 

function YearDropdown  ({
    list,
    title
})  {

    const [listOpen, setListOpen] = useState(false)
    const [headerTitle, setHeaderTitle] = useState(title)


    YearDropdown.handleClickOutside = () => {
        setListOpen(false)
    }


    return (
        <div className="year-dd-wrapper">
            <div className={`year-dd-header_${listOpen ? "is-open" : ''}`} onClick={() => setListOpen(!listOpen)}>
                <div className="year-dd-header-title">{title}</div>
                {listOpen 
                    ?   <Up className="dropdown-up"/>
                    :   <Down className="dropdown-down"/>
                }
            </div>
            {listOpen && <ul className="year-dd-list" style={{"marginTop":"4px"}}>
               {list.map((item) => (
                 <li key={item} className="year-dd-list-item">
                     <p className="year-dd-list-text">{item}</p>
                </li>
               ))}
            </ul>}
    
        </div>
    )
}   

const clickOutsideConfig = {
    handleClickOutside: () => YearDropdown.handleClickOutside
}

export default onClickOutside(YearDropdown, clickOutsideConfig) 