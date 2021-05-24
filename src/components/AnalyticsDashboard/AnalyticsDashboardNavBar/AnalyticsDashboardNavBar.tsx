// External imports
import React from 'react';
import moment from 'moment'

// Internal imports
import './AnalyticsDashboardNavBar.scss'
import { ReactComponent as BackArrow } from '../../../svgIcons/back.svg'
import { ReactComponent as NextArrow } from '../../../svgIcons/next.svg'
import {VIEW_WEEK, VIEW_MONTH, VIEW_YEAR} from '../constants/constants'
import {DateTime} from "luxon";

const monthTable = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
}

const AnalyticsDashboardNavBar = ({date, view, setView, goBack, goForward, setCurrentDate}) => {

    const currentWeekNr = DateTime.now().weekNumber
    const currentYear = DateTime.now().startOf("week").year

    return (
        <div id="anal-dash-nav-container">
            <div id="anal-dash-nav-to-current-container">
                {
                    !(currentWeekNr === date.week && currentYear === date.year) && 
                    <button
                        id="anal-dash-nav-to-current"
                        onClick={setCurrentDate}
                    >
                        To current week
                    </button>
                }
            </div>
    

            <div id="anal-dash-nav-central-container">
                <BackArrow onClick={goBack} id="anal-dash-nav-change-button"/>
                    <h2 id="anal-dash-nav-banner">{date.year}{view !== "year" && ","}</h2>
                    {view === "month" && <h2 id="anal-dash-nav-banner">{monthTable[date.month]}</h2>}
                    {view === "week" && <h2 id="anal-dash-nav-banner">week {date.week}</h2>}
                <NextArrow onClick={goForward} id="anal-dash-nav-change-button"/>
            </div>
            
            <div id="anal-dash-nav-view-by-container">
                View by
                <select name="viewBy" id="anal-dash-nav-bar__view-by__dropdown" onChange={(e) => setView(e.target.value)}>
                    <option value={VIEW_WEEK} id="anal-dash-nav-bar__view-by__dropdown-item">week</option>
                    <option value={VIEW_MONTH} id="anal-dash-nav-bar__view-by__dropdown-item">month</option>
                    <option value={VIEW_YEAR} id="anal-dash-nav-bar__view-by__dropdown-item">year</option>
                </select>
            </div> 
        </div> 
    );
}
 
export default AnalyticsDashboardNavBar;