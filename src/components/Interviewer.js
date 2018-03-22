import React from 'react';
import PropTypes from 'prop-types';

const Interviewer = ({ name, team }) => (
  <tr>
    <td>{name}</td>
    <td>{team}</td>
  </tr>
);

Interviewer.propTypes = {
  name: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired,
};

export default Interviewer;
