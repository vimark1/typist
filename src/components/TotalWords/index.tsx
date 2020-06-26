import PropTypes from 'prop-types';
import React from 'react';

import './style.scss';

const TotalWords = props => {
  const { size, increment, decrement } = props;
  return (
    <div className="container">
      nº of words:
      <button className="btn" onClick={decrement}>
        -
      </button>
      <strong>{size}</strong>
      <button className="btn" onClick={increment}>
        +
      </button>
    </div>
  );
};

TotalWords.propTypes = {
  size: PropTypes.number.isRequired,
};

export default TotalWords;
