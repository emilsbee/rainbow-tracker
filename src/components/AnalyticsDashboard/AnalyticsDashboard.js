// External imports
import React from 'react'
import PropTypes from 'prop-types'

// Internal imports
import './Styles.scss'
import TotalCard from './TotalCard'

const AnalyticsDashboard = ({ categories, categorySettings, activitySettings, weekYearTable }) => {
    console.log(categories)
    
    return (
        <div className="analytics-dashboard-container">
            <TotalCard 
                categories={categories[1].categories} 
                activities={categories[1].activities}
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