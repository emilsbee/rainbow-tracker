// External imports
import { useStoreActions, useStoreState } from 'easy-peasy'
import React from 'react'
import moment from 'moment'


// Internal imports
import './Styles.scss'
import { ReactComponent as BackArrow } from './utils/back.svg'
import { ReactComponent as NextArrow } from './utils/next.svg'

const MainDashboardNavBar = ({ weekNr, year}) => {
    const nextWeek = useStoreActions(actions => actions.weeks.nextWeek)
    const previousWeek = useStoreActions(actions => actions.weeks.previousWeek)
    const getWeek = useStoreActions(actions => actions.weeks.getWeek)
    const setNotes = useStoreActions(actions => actions.notes.setNotes)
    const setCategories = useStoreActions(actions => actions.activities.setCategories)

    const currentWeekNr = moment().isoWeek()
    const currentYear = moment().year()

    const handleToCurrentWeek = () => {

        // Necessary to set these to empty array to initiate loading in mainDashboardTable
        setNotes({notes: []})
        setCategories({categories: []})
        
        getWeek({weekNr: currentWeekNr, year: currentYear})
    }

    return (
        <div id="dashboard-nav-container">
                <div id="dashboard-nav-back-to-current-container">
                    {!(currentWeekNr === weekNr && currentYear === year) && 
                    <button
                        id="dashboard-nav-back-to-current"
                        onClick={handleToCurrentWeek}
                    >
                        To current week
                    </button>}
                </div>

                <div
                    id="dashboard-nav-central-container"
                >
                    <BackArrow onClick={() => previousWeek({ currentWeekNr: weekNr, currentYear: year })} id="dashboard-nav-previous-week" />
                            <h2 id="dashboard-nav-year-banner">{year},</h2>
                            <h2 id="dashboard-nav-week-banner">week {weekNr}</h2>
                    <NextArrow 
                        onClick={() => nextWeek({ currentWeekNr: weekNr, currentYear: year })} 
                        id="dashboard-nav-next-week" 
                    />
                </div>
                <div
                    style={{
                        width: "33%"
                    }}
                />
                
        </div>
    )
}   

export default MainDashboardNavBar