import React from 'react';
import PieChart from 'react-simple-pie-chart';


import './TotalCard.scss'
import {capitalizeFirstLetter, findCategoryActivities} from './helpers'

const TotalCard = ({ categories, activities, categorySettings, activitySettings }) => {
    
    return (
        <div id="anal-total-card__container">
            
            <div id="anal-total-card__header">
                <h2 id="anal-total-card__header-text">
                    Total
                </h2>
            </div>
            <div id="anal-total-card__content">
                <div id="anal-total-card__content-categories">
                    
                    {Object.keys(categories).map(categoryid => {
                        console.log(activities)
                        let categoryActivities = findCategoryActivities(categoryid, activitySettings)
                        
                        return (
                            <div key={categoryid} id="anal-total-card__content-categories__category">
                                <div id="anal-total-card__content-categories__category__title"> 
                                    <p style={{fontWeight: "700"}}>
                                        {categorySettings[categoryid] &&  capitalizeFirstLetter(categorySettings[categoryid].category)}
                                    </p>
                                    <p id="anal-total-card__content-categories__category__">
                                        {(parseInt(categories[categoryid])*15)/60}h
                                    </p>
                                </div>

                                {categoryActivities.map(activity => {

                                    return (
                                        <div id="anal-total-card__content-activities" key={activity.activityid}>
                                            <div id="anal-total-card__content-categories__category__title"> 
                                                <p style={{marginLeft: "18px"}}>
                                                    {activitySettings[activity.activityid] &&  capitalizeFirstLetter(activitySettings[activity.activityid].long)}
                                                </p>
                                                <p id="anal-total-card__content-categories__category__">
                                                    {(parseInt(activities[activity.activityid])*15)/60}h
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}

                </div>

            <PieChart 
                    style={{height: "200px"}}
                    slices={[
                        {
                            color: '#f00',
                            value: 10,
                            someOtherProperty: "per"
                          },
                          {
                            color: '#0f0',
                            value: 20,
                          },
                    ]}
                />
            </div>
        </div>
    );
}
 
export default TotalCard;