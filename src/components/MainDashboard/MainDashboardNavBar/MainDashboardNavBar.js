// External imports
import { useStoreActions } from 'easy-peasy'
import React from 'react'
import moment from 'moment'
import {DateTime} from "luxon";
import PropTypes from 'prop-types'


// Internal imports
import './MainDashboardNavBar.scss'
import { ReactComponent as BackArrow } from '../../../svgIcons/back.svg'
import { ReactComponent as NextArrow } from '../../../svgIcons/next.svg'

const MainDashboardNavBar = ({ weekNr, year}) => {
    // Store actions
    const nextWeek = useStoreActions(actions => actions.weeks.nextWeek)
    const previousWeek = useStoreActions(actions => actions.weeks.previousWeek)
    const getWeek = useStoreActions(actions => actions.weeks.getWeek)

    const currentWeekNr = DateTime.now().weekNumber
    // It is important to get the year from the start of the current week because there can be a scenario when a week
    // is the last week of a year, however the current year could already be a new year so it would show the last week of the next year.
    const currentYear = DateTime.now().startOf("week").year

    /**
     * Handles to current week button press.
     */
    const handleToCurrentWeek = () => {
        getWeek({weekNr: currentWeekNr, year: currentYear})
    }

    /**
     * Handles next week button press.
     */
    const handleNextWeek = () => {
        nextWeek({ currentWeekNr: weekNr, currentYear: year })
    }

    /**
     * Handles previous week button press.
     */
    const handlePrevWeek = () => {
        previousWeek({ currentWeekNr: weekNr, currentYear: year })
    }

    return (
        <div id="main-dashboard-nav-container">
                <div id="main-dashboard-nav-back-to-current-container">
                    {!(currentWeekNr === weekNr && currentYear === year) && 
                        <button
                            id="main-dashboard-nav-back-to-current"
                            onClick={handleToCurrentWeek}
                        >
                            To current week
                        </button>
                    }
                </div>

                <div id="main-dashboard-nav-central-container">
                    <BackArrow onClick={handlePrevWeek} id="main-dashboard-week-change-button"/>
                            <h2 id="main-dashboard-nav-banner">{year},</h2>
                            <h2 id="main-dashboard-nav-banner">week {weekNr}</h2>
                    <NextArrow onClick={handleNextWeek} id="main-dashboard-week-change-button"/>
                </div>

                <div
                    style={{
                        width: "33%",
                        height: "60px"
                    }}
                />
                
        </div>
    )
}   

MainDashboardNavBar.propTypes = {
    weekNr: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired
}

export default MainDashboardNavBar