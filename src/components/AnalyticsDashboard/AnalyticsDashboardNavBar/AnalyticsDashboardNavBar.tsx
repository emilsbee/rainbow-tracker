// External imports
import React from 'react';

// Internal imports
import './AnalyticsDashboardNavBar.scss'
import { ReactComponent as BackArrow } from '../../../svgIcons/back.svg'
import { ReactComponent as NextArrow } from '../../../svgIcons/next.svg'
import {VIEW_WEEK, VIEW_MONTH, VIEW_YEAR} from '../constants/constants'
import {DateTime, Info} from "luxon";
import {useStoreActions} from "../../../store/hookSetup";

const AnalyticsDashboardNavBar = ({date, view, setView}) => {
    // Store actions
    const goBackInTime = useStoreActions(actions => actions.analytics.goBackInTime)
    const goForwardInTime = useStoreActions(actions => actions.analytics.goForwardInTime)
    const setCurrentDate = useStoreActions(actions => actions.analytics.setCurrentDate)

    const currentWeekNr = DateTime.now().weekNumber
    const currentYear = DateTime.now().startOf("week").year

    return (
        <div id="anal-dash-nav-container">
            <div id="anal-dash-nav-to-current-container">
                {
                    !(currentWeekNr === date.weekNr && currentYear === date.year) &&
                    <button
                        id="anal-dash-nav-to-current"
                        onClick={() => setCurrentDate()}
                    >
                        To current date
                    </button>
                }
            </div>
    

            <div id="anal-dash-nav-central-container">
                <BackArrow onClick={() => {
                    goBackInTime({timeUnit: view})
                }} id="anal-dash-nav-change-button"/>
                    <h2 id="anal-dash-nav-banner">{date.year}{view !== "year" && ","}</h2>
                    {view === "month" && <h2 id="anal-dash-nav-banner">{Info.months()[date.month]}</h2>}
                    {view === "week" && <h2 id="anal-dash-nav-banner">week {date.weekNr}</h2>}
                <NextArrow onClick={() => {
                    goForwardInTime({timeUnit: view})
                }} id="anal-dash-nav-change-button"/>
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