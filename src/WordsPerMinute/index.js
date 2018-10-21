import React from 'react';
import PropTypes from 'prop-types';

const WordsPerMinute = ({ wordsPerMinute }) => (
  <pre>[{wordsPerMinute.join(', ')}]</pre>
);

WordsPerMinute.propTypes = {
  wordsPerMinute: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default WordsPerMinute;
