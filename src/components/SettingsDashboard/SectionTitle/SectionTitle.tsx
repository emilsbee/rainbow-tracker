// External imports
import React from 'react'

// Internal imports
import './section-title.scss'

type SectionTitleProps = {
    title:string
}

function SectionTitle ({title}:SectionTitleProps) {

    return (
        <div id="settings-dashboard-section-title-container">
            {title}
        </div>
    )
}

export default SectionTitle