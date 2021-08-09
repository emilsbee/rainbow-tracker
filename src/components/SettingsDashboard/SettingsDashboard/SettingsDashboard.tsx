// External imports
import React from 'react'

// Internal imports
import './settingsDashboard.scss'
import CategorySection from '../CategorySection/CategorySection/CategorySection'
import {ActivityType, CategoryType} from "../../../store/settings/settings";
import {ReactComponent as Loader} from "../../../svgIcons/spinner.svg";

type SettingsDashboardProps = {
    categoryTypes: CategoryType[],
    activityTypes: ActivityType[]
}

const SettingsDashboard  = ({categoryTypes, activityTypes}:SettingsDashboardProps) => {
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        if (categoryTypes == null || activityTypes == null) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    },[categoryTypes, activityTypes])

    if (loading) {
        return (
            <div id="settings-dashboard__loading">
                <Loader style={{height: '6rem', width: '6rem'}}/>
            </div>
        )
    }

    return (
        <div id="settings-dashboard-container">
            <div id="settings-dashboard-title">
                Settings
            </div>
            <CategorySection categoryTypes={categoryTypes} activityTypes={activityTypes} setLoading={setLoading}/>
        </div>
    )
}

export default SettingsDashboard