// External imports
import React from "react"

// Internal imports
import {
    AvailableDate,
    getAvailableDates,
    getTotalPerDay,
    TotalPerDay,
} from "../../../../dao/analytics/analyticsDao";
import {useStoreActions, useStoreState} from "../../../../store/hookSetup";
import TotalPerDayDashboard from "../TotalPerDayDashboard/TotalPerDayDashboard";
import {ActivityType, CategoryType} from "../../../../store/settings/settings";
import {getCategoryTypesFull} from "../../../../store/settings/helpers";
import ToolBar from "../../../BasicComponents/ToolBar/ToolBar";
import Dropdown from "../../../BasicComponents/ToolBar/ToolBarItems/Dropdown/Dropdown";
import {formatWeeks, getWeekDropdownWeeks} from "./helpers";

const TotalPerDayWrapper = () => {
    // Store actions
    const setCategoryTypes = useStoreActions(actions => actions.settings.setCategoryTypes)
    const setActivityTypes = useStoreActions(actions => actions.settings.setActivityTypes)
    const setDate = useStoreActions(actions => actions.settings.setDate)

    // Store state
    const userid = useStoreState(state => state.auth.uid)
    const currentDate = useStoreState(state => state.settings.currentDate)

    // Local state
    const [totalPerDay, setTotalPerDay] = React.useState<TotalPerDay[]>([])
    const [availableDates, setAvailableDates] = React.useState<AvailableDate[]>([])
    const [loading, setLoading] = React.useState(true)


    React.useEffect(() => {
        (async function () {
            setLoading(true)

            const categoryTypesFull: {activityTypes: ActivityType[], categoryTypes: CategoryType[]} = await getCategoryTypesFull(userid)
            setCategoryTypes({categoryTypes: categoryTypesFull.categoryTypes})
            setActivityTypes({activityTypes: categoryTypesFull.activityTypes})

            const fetchedTotalPerDay = await getTotalPerDay(userid, currentDate.weekNr, currentDate.year)
            setTotalPerDay(fetchedTotalPerDay)

            const fetchedAvailableDates = await getAvailableDates(userid)
            setAvailableDates(fetchedAvailableDates)

            setLoading(false)
        })()
    }, [])

    /**
     * Fetches the total per day for the new week. Also,
     * updates the new week in the store current date object.
     * @param weekNr to use for new total per day.
     */
    const changeWeek = async (weekNr: number): Promise<void> => {
        let fetchedTotalPerDay = await getTotalPerDay(userid, weekNr, currentDate.year)
        setTotalPerDay(fetchedTotalPerDay)
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
            let fetchedTotalPerDay = await getTotalPerDay(userid, weekNr, year)
            setTotalPerDay(fetchedTotalPerDay)

            setDate({date: {year, weekNr}})
        }
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
                    options={getWeekDropdownWeeks(availableDates, currentDate.year)}
                    onSelect={data => changeWeek(parseInt(data.toString()))}
                    selected={currentDate.weekNr}
                    text={formatWeeks(getWeekDropdownWeeks(availableDates, currentDate.year), currentDate.year)}
                />

            </ToolBar>

            <TotalPerDayDashboard loading={loading} totalPerDay={totalPerDay}/>
        </>
    )
}

export  default TotalPerDayWrapper