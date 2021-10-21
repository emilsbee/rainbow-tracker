// External imports
import React from "react"

// Internal imports
import "./card.scss"

type CardProps = {
    style?: React.CSSProperties
    id?: string
}

const Card:React.FC<CardProps> = ({children, style, id}) => {

    return (
        <section className={"analytics-card"} style={style} id={id}>
            {children}
        </section>
    )
}

export default Card