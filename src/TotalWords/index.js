import React from 'react';
import PropTypes from 'prop-types';

const TotalWords = ({ size }) => (
    <div>nº of words: {size}</div>
);

TotalWords.propTypes = {
    size: PropTypes.number.isRequired,
};

export default TotalWords;