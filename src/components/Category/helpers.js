// These values also have to be changed in the ./Styles.scss file
export const CONSTANTS = {
    CATEGOTY_HEIGHT: '22px',
    CATEGORY_MARGIN_BOTTOM: '2px' 
}

export const hasActivities = (categoryid, activitySettings) => {
    var exists = false
    Object.keys(activitySettings).forEach(activid => {
        
        if (activitySettings[activid].categoryid === categoryid) {
            exists = true
        } 
    })
    return exists
}