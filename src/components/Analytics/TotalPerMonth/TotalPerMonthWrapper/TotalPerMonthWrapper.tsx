// External imports
import React from "react"

// Internal imports
import ToolBar from "../../../BasicComponents/ToolBar/ToolBar";
import Dropdown from "../../../BasicComponents/ToolBar/ToolBarItems/Dropdown/Dropdown";
import {useStoreActions, useStoreState} from "../../../../store/hookSetup";
import NoAnalyticsBanner from "../../BasicComponents/NoAnalyticsBanner/NoAnalyticsBanner";
import TotalPerMonthDashboard from "../TotalPerMonthDashboard/TotalPerMonthDashboard";

const TotalPerMonthWrapper:React.FC = () => {
    // Store state
    const userid = useStoreState(state => state.auth.uid)
    const currentMonthDate = useStoreState(state => state.settings.currentMonthDate)
    const availableMonths = useStoreState(state => state.analytics.availableMonths)

    // Store actions
    const fetchAvailableMonths = useStoreActions(actions => actions.analytics.fetchAvailableMonths)
    const fetchTotalPerMonth = useStoreActions(actions => actions.analytics.fetchTotalPerMonth)
    const setDate = useStoreActions(actions => actions.settings.setDate)

    // Local state
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState<string | null>(null)


    React.useEffect(() => {
        (async function () {
            setLoading(true)

            try {
                await fetchTotalPerMonth({userid, month: currentMonthDate.month, year: currentMonthDate.year})
                await fetchAvailableMonths({userid})
                setError("")
            } catch (e: any) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    const changeMonth = async (month: number, year: number): Promise<void> => {
        setLoading(true)

        try {
            await fetchTotalPerMonth({userid, month, year})
            setError("")
        } catch (e: any) {
            setError(e.message)
        } finally {
            setLoading(false)
            setDate({
                date: {
                    weekNr: Math.max(...availableMonths.filter(availableMonth => availableMonth.year === year && availableMonth.month === month).flatMap(availableMonth => availableMonth.weekNr)),
                    year
                }
            })
        }
    }

    const changeYear = async (year: number): Promise<void>  => {
        let month: number = Math.max(...availableMonths.filter(availableMonth => availableMonth.year === year).flatMap(availableMonth => availableMonth.month))

        setLoading(true)

        try {
            await fetchTotalPerMonth({userid, month, year})
            setError("")
        } catch (e: any) {
            setError(e.message)
        } finally {
            setLoading(false)
            setDate({
                date: {
                    year,
                    weekNr: Math.max(...availableMonths.filter(availableMonth => availableMonth.year === year).flatMap(availableMonth => availableMonth.weekNr))
                }
            })
        }
    }

    return (
        <>
            <ToolBar>
                <Dropdown
                    label={"Year"}
                    options={[...new Set(availableMonths.flatMap(availableDate => availableDate.year))]}
                    onSelect={data => changeYear(parseInt(data.toString()))}
                    selected={currentMonthDate.year}
                />
                <Dropdown
                    label={"Month"}
                    options={[... new Set(availableMonths.filter(availableMonth => availableMonth.year === currentMonthDate.year).flatMap(availableMonth => availableMonth.month))].sort((a,b) => a > b ? -1 : 1)}
                    onSelect={data => changeMonth(parseInt(data.toString()), currentMonthDate.year)}
                    selected={currentMonthDate.month}
                />
            </ToolBar>

            {error ?
                <NoAnalyticsBanner message={error}/>
                :
                <TotalPerMonthDashboard loading={loading}/>
            }
        </>
    )
}

export default TotalPerMonthWrapper