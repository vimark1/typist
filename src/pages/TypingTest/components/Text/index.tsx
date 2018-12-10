import PropTypes from 'prop-types';
import React from 'react';

import Letter from '../Letter';

import './style.scss';

const Text = ({ letters, index }) => (
  <div className="text">
    {letters.map((letter, idx) => (
      <Letter key={idx} isCurrent={idx === index} {...letter} />
    ))}
  </div>
);

Text.propTypes = {
  letters: PropTypes.arrayOf(
    PropTypes.shape({
      done: PropTypes.bool.isRequired,
      letter: PropTypes.string.isRequired,
    })
  ).isRequired,
  index: PropTypes.number.isRequired,
};

export default Text;
