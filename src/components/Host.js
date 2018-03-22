import React from 'react';
import PropTypes from 'prop-types';

const Host = ({ name }) => (
  <tr><td>{name}</td></tr>
);

Host.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Host;
