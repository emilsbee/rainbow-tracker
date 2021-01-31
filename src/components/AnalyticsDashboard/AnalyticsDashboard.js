// External imports
import React from 'react'
import PropTypes from 'prop-types'
import { useStoreState } from 'easy-peasy'

// Internal imports
import './AnalyticsDashboard.scss'
import TotalCard from './TotalCard'
import LoadingPage from '../LoadingPage/LoadingPage'

const AnalyticsDashboard = ({ categories, categorySettings, activitySettings, weekYearTable }) => {
    const currentDate = useStoreState(state => state.settings.currentDate)

    if (categories.length === 0) {
        return (
            <div
                style={{
                    marginBottom: "-47px",
                    marginTop: "-160px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}
            >
                <LoadingPage />
            </div>
        )
    }
    
    return (
        <div className="analytics-dashboard-container">
            
            {/* <TotalCard 
                categories={categories[1].categories} 
                activities={categories[1].activities}
                activitySettings={activitySettings} 
                categorySettings={categorySettings}
            /> */}
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