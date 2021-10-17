// External imports
import React from 'react'

// Internal imports
import './settingsDashboard.scss'
import CategorySection from '../CategorySection/CategorySection/CategorySection'
import {ActivityType, CategoryType} from "../../../store/settings/settings";
import {ReactComponent as Loader} from "../../../svgIcons/spinner.svg";

type SettingsDashboardProps = {
    categoryTypes: CategoryType[],
    activityTypes: ActivityType[],
    loading: boolean,
    setLoading: (loading: boolean) => void
}

const SettingsDashboard  = ({categoryTypes, activityTypes, loading, setLoading}:SettingsDashboardProps) => {

    if (loading) {
        return (
            <div className="settings-dashboard__loading">
                <Loader style={{height: '6rem', width: '6rem'}}/>
            </div>
        )
    }

    return (
        <div className="settings-dashboard-container">
            <div className="settings-dashboard-title">
                Settings
            </div>
            <CategorySection categoryTypes={categoryTypes} activityTypes={activityTypes} setLoading={setLoading}/>
        </div>
    )
}

export default SettingsDashboard