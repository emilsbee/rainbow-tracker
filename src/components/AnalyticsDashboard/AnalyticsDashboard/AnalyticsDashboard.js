// External imports
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useStoreState } from 'easy-peasy'

// Internal imports
import './AnalyticsDashboard.scss'
import TotalCard from '../TotalCard'
import TotalPie from '../TotalPie'
import Card from '../Card'
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
        <div id="analytics-dashboard-container">
            
            <Card title="Total">
                <TotalCard 
                    categories={dataToDisplay.categories} 
                    activities={dataToDisplay.activities}
                    activitySettings={activitySettings} 
                    categorySettings={categorySettings}
                    view={view}
                />
            </Card>
            
            <Card title="Total">
                <TotalPie />    
            </Card>
        </div>
    )
}

AnalyticsDashboard.propTypes = {
        
}


export default AnalyticsDashboard