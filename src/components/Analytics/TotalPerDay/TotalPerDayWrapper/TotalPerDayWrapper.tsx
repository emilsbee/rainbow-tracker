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

const TotalPerDayWrapper = () => {
    // Store actions
    const setCategoryTypes = useStoreActions(actions => actions.settings.setCategoryTypes)
    const setActivityTypes = useStoreActions(actions => actions.settings.setActivityTypes)

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

    return (
        <TotalPerDayDashboard loading={loading} totalPerDay={totalPerDay}/>
    )
}

export  default TotalPerDayWrapper