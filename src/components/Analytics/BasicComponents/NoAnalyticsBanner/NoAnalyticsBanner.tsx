// External imports
import React from "react"

// Internal imports
import "./no-analytics-banner.scss"

type NoAnalyticsBannerProps = {
    message: string
}

const NoAnalyticsBanner:React.FC<NoAnalyticsBannerProps> = ({message}) => (
    <section className={"no-analytics-banner"}>
        {message}
    </section>
)

export default NoAnalyticsBanner