import React from 'react';
import PropTypes from 'prop-types';
import styles from './Simple.scss';

export const Simple = ({label}) => {
    return (
        <button className={styles.simpleButton}>
            {label}
        </button>
    )
}




Simple.propTypes = {
  label: PropTypes.string.isRequired,
};


