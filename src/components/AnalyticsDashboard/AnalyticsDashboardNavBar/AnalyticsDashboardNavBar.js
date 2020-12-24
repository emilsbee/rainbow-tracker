// External imports
import React from 'react';

// Internal imports
import './AnalyticsDashboardNavBar.scss'
import { ReactComponent as BackArrow } from '../../MainDashboard/MainDashboardNavBar/utils/back.svg'
import { ReactComponent as NextArrow } from '../../MainDashboard/MainDashboardNavBar/utils/next.svg'

const AnalyticsDashboardNavBar = () => {
    return (
        <div id="anal-dash-nav-bar__container">
            <div id="anal-dash-nav-bar__view-by__container">
                View by
                <select name="viewBy" id="anal-dash-nav-bar__view-by__dropdown">
                    <option value="week" id="anal-dash-nav-bar__view-by__dropdown-item">week</option>
                    <option value="month" id="anal-dash-nav-bar__view-by__dropdown-item">month</option>
                    <option value="year" id="anal-dash-nav-bar__view-by__dropdown-item">year</option>
                </select>
            </div>

            <div id="anal-dash-nav-bar__controls-container">
                <BackArrow id="dashboard-nav-previous-week" />
                    <h2 id="dashboard-nav-year-banner">2020,</h2>
                    <h2 id="dashboard-nav-week-banner">week 52</h2>
                <NextArrow 
                    id="dashboard-nav-next-week" 
                />
            </div>

            <div id="anal-dash-nav-bar__placeholder">

            </div>
        </div>
    );
}
 
export default AnalyticsDashboardNavBar;