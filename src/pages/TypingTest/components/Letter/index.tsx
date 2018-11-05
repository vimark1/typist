import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import './style.css';

const Text = ({ done, letter, isCurrent }) => (
  <span className={cx('letter', { done, current: isCurrent })}>{letter}</span>
);

Text.propTypes = {
  done: PropTypes.bool.isRequired,
  letter: PropTypes.string.isRequired,
  isCurrent: PropTypes.bool.isRequired,
};

export default Text;
