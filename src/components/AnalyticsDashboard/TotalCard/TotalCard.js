// External imports
import React, { useState } from 'react';
import PropTypes from 'prop-types'

// Internal imports
import { ReactComponent as ArrowRight } from '../../../svgIcons/arrowRight.svg'
import { ReactComponent as ArrowDown } from '../../../svgIcons/arrowDown.svg'
import {capitalizeFirstLetter, findCategoryActivities} from './helpers'
import './TotalCard.scss'

const TotalCard = ({ categories, activities, categorySettings, activitySettings }) => {
    const [expandedCategories, setExpandedCategories] = useState([]) // Holds the categoryids of expanded categories

    const removeFromExpandedCategories = (categoryid) => {
        setExpandedCategories(expandedCategories.filter(category => category !== categoryid))
    }

    return (
        <div>
            <div id="anal-total-card__content-categories">
                {Object.keys(categories).map(categoryid => {
                    
                    let categoryActivities = findCategoryActivities(categoryid, activitySettings)
                    
                    return (
                        <div key={categoryid}>
                            <div id="anal-total-card__content-title"> 
                                <p style={{fontWeight: "700"}}>
                                    {categorySettings[categoryid] &&  capitalizeFirstLetter(categorySettings[categoryid].category)}
                                </p>

                                <div style={{display: "flex", flexDirection: "row", alignItems:"center"}}>
                                    <p style={{marginRight: "10px"}}>
                                        {(parseInt(categories[categoryid])*15)/60}h
                                    </p>
                                    {expandedCategories.includes(categoryid) ?
                                        <ArrowDown 
                                            id="anal-total-card__content-arrow" 
                                            onClick={() => removeFromExpandedCategories(categoryid)}
                                        /> :
                                        <ArrowRight 
                                            id="anal-total-card__content-arrow" 
                                            onClick={() => setExpandedCategories([...expandedCategories, categoryid])}
                                        />
                                    }
                                </div>
                            </div>

                            {expandedCategories.includes(categoryid) &&
                                categoryActivities.map(activity => {

                                    return (
                                        <div key={activity.activityid}>
                                            <div id="anal-total-card__content-title"> 
                                                <p style={{marginLeft: "18px"}}>
                                                    {activitySettings[activity.activityid] &&  capitalizeFirstLetter(activitySettings[activity.activityid].long)}
                                                </p>
                                                <p>
                                                    {(parseInt(activities[activity.activityid])*15)/60}h
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
    activitySettings: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string))
}
 
export default TotalCard;