// External imports
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useStoreActions, useStoreState } from 'easy-peasy';
import LoadingPage from '../LoadingPage/LoadingPage'

import AnalyticsDashboard from '../AnalyticsDashboard'


import './Styles.scss'

const AnalyticsDashboardWrapper = () => {
    const getCategories = useStoreActions(actions => actions.analytics.getCategories)
    const categories = useStoreState(state => state.analytics.categories)
    const weekYearTable = useStoreState(state => state.analytics.weekYearTable)
    
    const activitySettings = useStoreState(state => state.settings.activitySettings)
    const categorySettings = useStoreState(state => state.settings.categorySettings)

    useEffect(() => {
        getCategories()
    }, [getCategories])

    if (categories.length === 0) {
        return (
            <div
                style={{
                    marginTop: "-100px",
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
        <div className="analytics-wrapper">
            <AnalyticsDashboard 
                categories={categories} 
                activitySettings={activitySettings} 
                categorySettings={categorySettings}
                weekYearTable={weekYearTable}
            />
        </div>
    )
}

AnalyticsDashboardWrapper.propTypes = {
        
}


export default AnalyticsDashboardWrapper