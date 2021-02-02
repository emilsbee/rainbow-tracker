// External imports
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useStoreState } from 'easy-peasy'

// Internal imports
import './AnalyticsDashboard.scss'
import TotalCard from '../TotalCard'
import LoadingPage from '../../LoadingPage/LoadingPage'
import {getDataToDisplay} from './helpers'

const AnalyticsDashboard = ({ categories, categorySettings, activitySettings, weekYearTable, view, date }) => {
    const [dataToDisplay, setDataToDisplay] = useState(false)

    useEffect(() => {
        setDataToDisplay(getDataToDisplay(view, date, categories))
    },[view, date, categories, setDataToDisplay])

    
    if (categories.length === 0 || !dataToDisplay) {
        return (
            <div id="analytics-dashboard-loading-container">
                <LoadingPage />
            </div>
        )
    }

    return (
        <div className="analytics-dashboard-container">
            
            <TotalCard 
                categories={dataToDisplay.categories} 
                activities={dataToDisplay.activities}
                activitySettings={activitySettings} 
                categorySettings={categorySettings}
            />
            {/* {Object.keys(categories[0].categories).map(categoryid => {

                if (categorySettings[categoryid]) {

                    return (
                        <div style={{height: '50px', width: '200px', backgroundColor: 'white'}}>
                            {categorySettings[categoryid].category} {(parseInt(categories[42].categories[categoryid])*15)/60}h
                        </div>
                    )
                } else{
                    return null
                }
            })} */}
        </div>
    )
}

AnalyticsDashboard.propTypes = {
        
}


export default AnalyticsDashboard