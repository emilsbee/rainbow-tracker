export function capitalizeFirstLetter(string) {
    string = string.toLowerCase()
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const findCategoryActivities = (categoryid, activitySettings) => {
  let activityids = []

  for (var i = 0; i < Object.keys(activitySettings).length; i++) {
    if (activitySettings[Object.keys(activitySettings)[i]].categoryid === categoryid) {
      activityids.push({
        ...activitySettings[Object.keys(activitySettings)[i]],
        activityid: Object.keys(activitySettings)[i]
      })
    }
  }
  return activityids
}