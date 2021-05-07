// External imports
import { useStoreActions } from 'easy-peasy'
import React from 'react'
import moment from 'moment'
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
    const setNotes = useStoreActions(actions => actions.notes.setNotes)
    const setCategories = useStoreActions(actions => actions.activities.setCategories)

    const currentWeekNr = moment().isoWeek()
    const currentYear = moment().startOf("isoWeek")._d.getFullYear()

    /**
     * Handles to current week button press.
     */
    const handleToCurrentWeek = () => {
        // Necessary to set these to empty array to initiate loading in mainDashboardTable
        setNotes({notes: []})
        setCategories({categories: []})
        
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