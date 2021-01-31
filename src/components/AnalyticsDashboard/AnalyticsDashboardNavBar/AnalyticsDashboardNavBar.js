// External imports
import React from 'react';
import moment from 'moment'

// Internal imports
import './AnalyticsDashboardNavBar.scss'
import { ReactComponent as BackArrow } from '../../MainDashboard/MainDashboardNavBar/utils/back.svg'
import { ReactComponent as NextArrow } from '../../MainDashboard/MainDashboardNavBar/utils/next.svg'
 
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
     
    const currentWeekNr = moment().isoWeek()
    const currentYear = moment().year()

    return (
        <div id="anal-dash-nav-bar__container">
            <div id="dashboard-nav-back-to-current-container">
                {
                    !(currentWeekNr === date.week && currentYear === date.year) && 
                    <button
                        id="dashboard-nav-back-to-current"
                        onClick={setCurrentDate}
                    >
                        To current week
                    </button>
                }
            </div>
    

            <div id="anal-dash-nav-bar__controls-container">
                <BackArrow id="dashboard-nav-previous-week" onClick={goBack}/>
                    <h2 id="dashboard-nav-year-banner">{date.year}{view !== "year" && ","}</h2>
                    {view === "month" && <h2 id="dashboard-nav-week-banner">{monthTable[date.month]}</h2>}
                    {view === "week" && <h2 id="dashboard-nav-week-banner">week {date.week}</h2>}
                <NextArrow 
                    id="dashboard-nav-next-week" 
                    onClick={goForward}
                />
            </div>
            
            <div id="anal-dash-nav-bar__view-by__container">
                View by
                <select name="viewBy" id="anal-dash-nav-bar__view-by__dropdown" onChange={(e) => setView(e.target.value)}>
                    <option value="week" id="anal-dash-nav-bar__view-by__dropdown-item">week</option>
                    <option value="month" id="anal-dash-nav-bar__view-by__dropdown-item">month</option>
                    <option value="year" id="anal-dash-nav-bar__view-by__dropdown-item">year</option>
                </select>
            </div> 
        </div> 
    );
}
 
export default AnalyticsDashboardNavBar;