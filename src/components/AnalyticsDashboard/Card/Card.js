// External imports
import React from 'react';
import PropTypes from 'prop-types'

// Internal imports
import './Card.scss'

const Card = ({children}) => {
    
    return (
        <div id="anal-card__container">
            <div>{children}</div>
        </div>
    );
}

Card.propTypes = {
    children: PropTypes.element
}

export default Card;