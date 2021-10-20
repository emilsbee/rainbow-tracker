// External imports
import React from "react"
import {Duration} from "luxon";

// Internal imports
import "./analytics-popover.scss"
import {getTotalPerDaySpecific, TotalPerDaySpecific} from "../../../../dao/analytics";
import {useStoreState} from "../../../../store/hookSetup";

type AnalyticsPopoverProps = {
    day: number
    weekNr: number
    year: number
}

const AnalyticsPopover:React.FC<AnalyticsPopoverProps> = ({day, weekNr, year}) => {
    // Store state
    const userid = useStoreState(state => state.auth.uid)

    // Local state
    const [loading, setLoading] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string>("")
    const [totalPerDaySpecific, setTotalPerDaySpecific] = React.useState<TotalPerDaySpecific | null>(null)
    const [position, setPosition] = React.useState<{top:number, right:number, bottom:number, left:number}>({top: 0, right: 0, left: 0, bottom: 0})

    React.useEffect(() => {
        (async function() {
            const dayHeader = document.getElementsByClassName(`day-header ${day}`)[0]
            const dayHeaderRect = dayHeader.getBoundingClientRect()
            setPosition({top: dayHeaderRect.top, bottom: dayHeaderRect.bottom, right: dayHeaderRect.right, left: dayHeaderRect.left})

            setLoading(true)

            try {
                const fetchedTotalPerDaySpecific = await getTotalPerDaySpecific(userid, day, weekNr, year)
                setError("")
                setTotalPerDaySpecific(fetchedTotalPerDaySpecific)
            } catch (e: any) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        })()

    }, [day, weekNr, year])

    if (loading || !totalPerDaySpecific) return null

    return (
        <table className={"main-dashboard__day-analytics-popover"} style={{top: position.bottom, left: position.left+30}}>
            {totalPerDaySpecific.categories.map(category => {
                return (
                    <tr className={"main-dashboard__day-analytics-popover__row"}>
                        <td>
                            <div
                                className={"main-dashboard__day-analytics-popover__category-color"}
                                style={{
                                    backgroundColor: category.color
                                }}
                            />
                        </td>

                        <td>
                            {category.name}
                        </td>

                        <td style={{paddingLeft: "15px"}}>
                            {Duration.fromObject({minutes: category.count*15}).toFormat("h:mm")}h
                        </td>
                    </tr>
                )
            })}
        </table>
    )
}

export default AnalyticsPopover