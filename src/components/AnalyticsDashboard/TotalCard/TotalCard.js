// External imports
import React, { useState } from 'react';
import PropTypes from 'prop-types'

// Internal imports
import { ReactComponent as ArrowRight } from '../../../svgIcons/arrowRight.svg'
import { ReactComponent as ArrowDown } from '../../../svgIcons/arrowDown.svg'
import Toggle from '../../BasicComponents/Toggle'
import {capitalizeFirstLetter, findCategoryActivities, hasActivities, getMaximumTimeUnits} from './helpers'
import './TotalCard.scss'

const TotalCard = ({ categories, activities, categorySettings, activitySettings, view }) => {
    const [expandedCategories, setExpandedCategories] = useState([]) // Holds the categoryids of expanded categories
    const [currentUnitView, setCurrentUnitView] = useState("h")
    
    /**
     * Either adds or removes the given categoryid based
     * on whether the categoryid is already added.
     * @param {String} categoryid Id of a category.
     */
    const changeExpandedCategories = (categoryid) => {
        if (hasActivities(categoryid, activitySettings)) { // Checks that the category actually has activities
            
            if (expandedCategories.includes(categoryid)) {
                setExpandedCategories(expandedCategories.filter(category => category !== categoryid))
            } else {
                setExpandedCategories([...expandedCategories, categoryid])
            }

        }
    }

    return (
        <div>
            <div id="anal-total-card__header">
                <h2 id="anal-total-card__header-text">
                    Total
                </h2>
                <Toggle 
                    values={["%", "h"]}
                    activeValue={currentUnitView} 
                    setActiveValue={setCurrentUnitView}
                />
            </div>
            <div id="anal-total-card__content-categories">
                {Object.keys(categories).map(categoryid => {
                    
                    let categoryActivities = findCategoryActivities(categoryid, activitySettings)
                    
                    return (
                        <div id="anal-total-card__content-body" key={categoryid} onClick={() => changeExpandedCategories(categoryid)}>
                            <div id="anal-total-card__content-title"> 
                                <p style={{userSelect: "none"}}>
                                    {categorySettings[categoryid] &&  capitalizeFirstLetter(categorySettings[categoryid].category)}
                                </p>

                                <div style={{display: "flex", flexDirection: "row", alignItems:"center"}}>
                                    <p style={{marginRight: "10px", userSelect: "none"}}>
                                        {   
                                            currentUnitView === "h" ?
                                            Math.floor((parseInt(categories[categoryid])*15)/60) : // Total hours
                                            Math.floor((parseInt(categories[categoryid])/getMaximumTimeUnits(view))*100) // Percentage of total time in current view
                                        }
                                    </p>
                                    { 
                                        expandedCategories.includes(categoryid) ?
                                            <ArrowDown id="anal-total-card__content-arrow"/> :
                                            <ArrowRight id="anal-total-card__content-arrow" style={{fill: !  hasActivities(categoryid, activitySettings) && "transparent"}}/>
                                        
                                    }
                                </div>
                            </div>

                            {expandedCategories.includes(categoryid) &&
                                categoryActivities.map(activity => {

                                    return (
                                        <div key={activity.activityid}>
                                            <div id="anal-total-card__content-title"> 
                                                <p style={{marginLeft: "18px", userSelect: "none"}}>
                                                    {activitySettings[activity.activityid] &&  capitalizeFirstLetter(activitySettings[activity.activityid].long)}
                                                </p>
                                                <p style={{userSelect: "none"}}>
                                                    {
                                                         currentUnitView === "h" ?
                                                        Math.floor((parseInt(activities[activity.activityid])*15)/60) : // Total hours
                                                        Math.floor((parseInt(activities[activity.activityid])/getMaximumTimeUnits(view))*100) // Percentage of total time in current view
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })}

            </div>
        </div>
    );
}

TotalCard.propTypes = {
    categories: PropTypes.objectOf(PropTypes.number),
    activities: PropTypes.objectOf(PropTypes.number),
    categorySettings: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    activitySettings: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    view: PropTypes.string
}
 
export default TotalCard;