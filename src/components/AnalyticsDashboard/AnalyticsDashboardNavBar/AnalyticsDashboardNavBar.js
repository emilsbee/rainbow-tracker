// External imports
import React from 'react';

// Internal imports
import { monthTable } from '../../../models/analytics/helpers'
import './AnalyticsDashboardNavBar.scss'
import { ReactComponent as BackArrow } from '../../MainDashboard/MainDashboardNavBar/utils/back.svg'
import { ReactComponent as NextArrow } from '../../MainDashboard/MainDashboardNavBar/utils/next.svg'
 
const AnalyticsDashboardNavBar = ({date, view, setView, goBack, goForward}) => {
     
    return (
        <div id="anal-dash-nav-bar__container">
            <div id="anal-dash-nav-bar__view-by__container">
                View by
                <select name="viewBy" id="anal-dash-nav-bar__view-by__dropdown" onChange={(e) => setView(e.target.value)}>
                    <option value="week" id="anal-dash-nav-bar__view-by__dropdown-item">week</option>
                    <option value="month" id="anal-dash-nav-bar__view-by__dropdown-item">month</option>
                    <option value="year" id="anal-dash-nav-bar__view-by__dropdown-item">year</option>
                </select>
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

            <div id="anal-dash-nav-bar__placeholder">

            </div>
        </div> 
    );
}
 
export default AnalyticsDashboardNavBar;