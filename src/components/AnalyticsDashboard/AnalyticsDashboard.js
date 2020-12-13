// External imports
import React from 'react'
import PropTypes from 'prop-types'
import { useStoreActions, useStoreState } from 'easy-peasy';

// Internal imports
import './Styles.scss'

const AnalyticsDashboard = ({ categories, categorySettings, activitySettings, weekYearTable }) => {
    
    console.log(weekYearTable)
    return (
        <div>
            {Object.keys(categories[0].categories).map(categoryid => {

                if (categorySettings[categoryid]) {

                    return (
                        <div>
                            {categorySettings[categoryid].category} {(parseInt(categories[42].categories[categoryid])*15)/60}h
                        </div>
                    )
                } else{
                    return null
                }
            })}
        </div>
    )
}

AnalyticsDashboard.propTypes = {
        
}


export default AnalyticsDashboard