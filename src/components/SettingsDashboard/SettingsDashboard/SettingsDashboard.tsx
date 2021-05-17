// External imports
import React from 'react'

// Internal imports
import './settingsDashboard.scss'
import CategorySection from '../CategorySection/CategorySection/CategorySection'
import {ActivitySettings, CategorySettings} from "../../../store/settings/settings";
import {ReactComponent as Loader} from "../../../svgIcons/spinner.svg";

type SettingsDashboardProps = {
    categorySettings: CategorySettings,
    activitySettings: ActivitySettings
}

const SettingsDashboard  = ({categorySettings, activitySettings}:SettingsDashboardProps) => {
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        if (categorySettings == null || activitySettings == null) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    },[categorySettings, activitySettings])

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
            <CategorySection categorySettings={categorySettings} activitySettings={activitySettings} setLoading={setLoading}/>
        </div>
    )
}

export default SettingsDashboard