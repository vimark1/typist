import React from 'react';
import PropTypes from 'prop-types';

const TypingLocation = ({ location }) => (
  <sup>
    {`on index ${location}`}
  </sup>
);

TypingLocation.propTypes = {
  location: PropTypes.number.isRequired,
};

export default TypingLocation;
