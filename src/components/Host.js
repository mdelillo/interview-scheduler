import React from 'react';
import PropTypes from 'prop-types';
import HighlightableCell from './HighlightableCell';

const Host = ({ name }) => (
  <tr>
    <HighlightableCell value={name} />
  </tr>
);

Host.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Host;
