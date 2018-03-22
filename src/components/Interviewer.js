import React from 'react';
import PropTypes from 'prop-types';
import HighlightableCell from './HighlightableCell';

const Interviewer = ({ name, team }) => (
  <tr>
    <HighlightableCell value={name} />
    <HighlightableCell value={team} />
  </tr>
);

Interviewer.propTypes = {
  name: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired,
};

export default Interviewer;
