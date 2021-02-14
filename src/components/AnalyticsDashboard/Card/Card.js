// External imports
import React from 'react';
import PropTypes from 'prop-types'

// Internal imports
import './Card.scss'

const Card = ({children, title}) => {
    
    return (
        <div id="anal-card__container">
            <div id="anal-card__header">
                <h2 id="anal-card__header-text">
                    {title}
                </h2>
            </div>

            <div>{children}</div>
        </div>
    );
}

Card.propTypes = {
    children: PropTypes.element
}

export default Card;