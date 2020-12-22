import React from 'react';

import './TotalCard.scss'
import {capitalizeFirstLetter} from './helpers'

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
                    
                    {Object.keys(categories).map(categoryid => (
                        <div key={categoryid} id="anal-total-card__content-categories__category">
                            <p id="anal-total-card__content-categories__category__title">
                                {categorySettings[categoryid] &&  capitalizeFirstLetter(categorySettings[categoryid].category.toLowerCase())}
                            </p>

                            <p id="anal-total-card__content-categories__category__">
                                {(parseInt(categories[categoryid])*15)/60}h
                            </p>
                        </div>
                    ))}

                </div>

                <div id="anal-total-card__content-activities">

                </div>
            </div>
        </div>
    );
}
 
export default TotalCard;