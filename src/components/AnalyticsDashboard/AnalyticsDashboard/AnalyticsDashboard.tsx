// External imports
import React, { useState, useEffect } from 'react'
import {DateTime} from "luxon";
import moment from "moment";

// Internal imports
import './AnalyticsDashboard.scss'
import TotalCard from '../TotalCard'
import TotalPie from '../TotalPie'
import Card from '../Card'
import {getDataToDisplay} from './helpers'
import {ReactComponent as Loader} from "../../../svgIcons/spinner.svg";

const AnalyticsDashboard = ({ loading, analytics, categorySettings, activitySettings, weekYearTable, date, view}) => {
    // Local state
    const [dataToDisplay, setDataToDisplay] = useState(false)
    
    useEffect(() => {
        // setDataToDisplay(getDataToDisplay(view, date, analytics))
    },[view, date, analytics, setDataToDisplay])

    
    if (loading) {
        return (
            <div id="analytics-dashboard-loading-container">
                <Loader style={{height: '6rem', width: '6rem'}}/>
            </div>
        )
    }

    return (
        <div id="analytics-dashboard-container">
            {/*<Card >*/}
            {/*    <TotalCard */}
            {/*        categories={dataToDisplay.categories} */}
            {/*        activities={dataToDisplay.activities}*/}
            {/*        activitySettings={activitySettings} */}
            {/*        categorySettings={categorySettings}*/}
            {/*        view={view}*/}
            {/*    />*/}
            {/*</Card>*/}
            
            <Card>
                <TotalPie />    
            </Card>
        </div>
    )
}

AnalyticsDashboard.propTypes = {
        
}


export default AnalyticsDashboard