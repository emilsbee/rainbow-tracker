// External imports
import React, { useState } from 'react'
import onClickOutside from "react-onclickoutside";

// Internal imports
import './dropdown.scss'
import { ReactComponent as Up } from './utils/up.svg'
import { ReactComponent as Down } from './utils/down.svg'
 

function WeekDropdown  ({
    list,
    title
})  {

    const [listOpen, setListOpen] = useState(false)
    const [headerTitle, setHeaderTitle] = useState(title)


    WeekDropdown.handleClickOutside = () => {
        setListOpen(false)
    }


    return (
        <div className="dd-wrapper">
            <div className={`dd-header_${listOpen ? "is-open" : ''}`} onClick={() => setListOpen(!listOpen)}>
                <div className="dd-header-title">{title}</div>
                {listOpen 
                    ?   <Up className="dropdown-up"/>
                    :   <Down className="dropdown-down"/>
                }
            </div>
            {listOpen && <ul className="dd-list" style={{"marginTop":"4px"}}>
               {list.map((item) => (
                 <li key={item} className="dd-list-item">
                     <p className="dd-list-text">{item}</p>
                </li>
               ))}
            </ul>}
    
        </div>
    )
}   

const clickOutsideConfig = {
    handleClickOutside: () => WeekDropdown.handleClickOutside
}

export default onClickOutside(WeekDropdown, clickOutsideConfig) 