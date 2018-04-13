import React from 'react';
import PropTypes from 'prop-types';

const Spinner = ({ text }) => (
  <div className="loading-container">
    <div className="spinner" />
    <div className="spinner-center" />
    <div className="loading-text">{text}</div>
  </div>
);

Spinner.propTypes = {
  text: PropTypes.string,
};

Spinner.defaultProps = {
  text: '',
};

export default Spinner;
