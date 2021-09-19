// External imports
import React from "react"

// Internal imports
import {useStoreActions, useStoreState} from "../../../../store/hookSetup";
import {AvailableDate, getAvailableDates, getTotalPerWeek, TotalPerWeek} from "../../../../dao/analytics/analyticsDao";
import TotalPerWeekDashboard from "../TotalPerWeekDashboard/TotalPerWeekDashboard";
import ToolBar from "../../../BasicComponents/ToolBar/ToolBar";
import Dropdown from "../../../BasicComponents/ToolBar/ToolBarItems/Dropdown/Dropdown";
import {DateTime} from "luxon";

const TotalPerWeekWrapper = () => {
    // Store state
    const userid = useStoreState(state => state.auth.uid)
    const currentDate = useStoreState(state => state.settings.currentDate)

    // Store actions
    const setDate = useStoreActions(actions => actions.settings.setDate)

    // Local state
    const [totalPerWeek, setTotalPerWeek] = React.useState<TotalPerWeek>({categoryTypes: [], activityTypes: []})
    const [availableDates, setAvailableDates] = React.useState<AvailableDate[]>([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        (async function () {
            setLoading(true)

            const fetchedTotalPerWeek = await getTotalPerWeek(userid, currentDate.weekNr, currentDate.year)
            setTotalPerWeek(fetchedTotalPerWeek)

            const fetchedAvailableDates = await getAvailableDates(userid)
            setAvailableDates(fetchedAvailableDates)

            setLoading(false)
        })()
    }, [])

    /**
     * Fetches the total per week for the new week. Also,
     * updates the new week in the store current date object.
     * @param weekNr to use for new total per week.
     */
    const changeWeek = async (weekNr: number): Promise<void> => {
        let fetchedTotalPerWeek = await getTotalPerWeek(userid, weekNr, currentDate.year)
        setTotalPerWeek(fetchedTotalPerWeek)
        setDate({date: {weekNr, year: currentDate.year}})
    }

    /**
     * Fetches the total per week for the new year. Also,
     * updates the new year in the store current date object.
     * Important to note that the week chosen for the new year
     * is the latest one for it.
     * @param year to use for new total per week.
     */
    const changeYear =  async (year: number): Promise<void> => {
        let weekNr: number = -1

        // Finds the highest week for the year
        for (let i = 0; i < availableDates.length; i++) {
            if (availableDates[i].year === year) {
                weekNr = Math.max(...availableDates[i].weeks)
                break;
            }
        }

        if (weekNr !== -1) {
            let fetchedTotalPerWeek = await getTotalPerWeek(userid, weekNr, year)
            setTotalPerWeek(fetchedTotalPerWeek)

            setDate({date: {year, weekNr}})
        }
    }

    /**
     * Extracts the week numbers for a given year
     * from the available dates array.
     * @param year for which to find weeks.
     */
    const getWeekDropdownWeeks = (year: number): number[] => {
        let weeks:  number[] = []

        for (let i = 0; i < availableDates.length; i++) {
            if (availableDates[i].year === year) {
                weeks = availableDates[i].weeks
            }
        }

        return weeks
    }

    const formatWeeks = (weeks: number[], year: number) => {
        return weeks.map(week => `${DateTime.fromObject({weekNumber: week, weekYear: year}).startOf("week").toLocaleString({month: "short", day: "numeric"})} - 
        ${DateTime.fromObject({weekNumber: week, weekYear: year}).endOf("week").toLocaleString({month: "short", day: "numeric"})}
        `)
    }

    return (
        <>
            <ToolBar>
                <Dropdown
                    label={"Year"}
                    options={availableDates.flatMap(availableDate => availableDate.year)}
                    onSelect={data => changeYear(parseInt(data.toString()))}
                    selected={currentDate.year}
                />
                <Dropdown
                    label={"Week"}
                    options={getWeekDropdownWeeks(currentDate.year)}
                    onSelect={data => changeWeek(parseInt(data.toString()))}
                    selected={currentDate.weekNr}
                    text={formatWeeks(getWeekDropdownWeeks(currentDate.year), currentDate.year)}
                />

            </ToolBar>

            <TotalPerWeekDashboard totalPerWeek={totalPerWeek} loading={loading} availableDates={availableDates}/>
        </>
    )
}

export default TotalPerWeekWrapper