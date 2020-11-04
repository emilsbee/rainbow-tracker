// External imports
import React from 'react'
import PropTypes from 'prop-types'

// Internal imports
import './Styles.scss'
import * as constants from'./Constants.scss'

const Category = ({ categoryid, loading, onClick, onDragStart, color }) => {
    
    

    if (loading) {
        return (
            <div className="category-container"/>
        )
    }

    return (    
        <div 
            draggable={true}
            onClick={() => console.log('click')}
            onDragStart={(e) => console.log('drag start')}
            onDragEnd={(e) => console.log('drag end')}
            className="category-container"
            style={{
                backgroundColor: color ? color : constants.defaultBackground
            }}
        />
    )
}

Category.propTypes = {
    categoryid: PropTypes.string,
    category: PropTypes.string,
    loading: PropTypes.bool,
    color: PropTypes.string,
    onClick: PropTypes.func,
    onDragStart: PropTypes.func
};

export default Category