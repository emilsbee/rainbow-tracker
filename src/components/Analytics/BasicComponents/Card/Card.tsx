// External imports
import React from "react"

// Internal imports
import "./card.scss"

type CardProps = {
    style: React.CSSProperties
}

const Card:React.FC<CardProps> = ({children, style}) => {

    return (
        <section className={"analytics-card"} style={style}>
            {children}
        </section>
    )
}

export default Card