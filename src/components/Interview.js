import React from 'react';
import PropTypes from 'prop-types';

const Interviewer = ({
  date, morningPair, morningTeam, afternoonPair, afternoonTeam, host,
}) => (
  <tr>
    <td>{date}</td>
    <td>{morningPair}</td>
    <td>{morningTeam}</td>
    <td>{afternoonPair}</td>
    <td>{afternoonTeam}</td>
    <td>{host}</td>
  </tr>
);

Interviewer.propTypes = {
  date: PropTypes.string.isRequired,
  morningPair: PropTypes.string.isRequired,
  morningTeam: PropTypes.string.isRequired,
  afternoonPair: PropTypes.string.isRequired,
  afternoonTeam: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
};

export default Interviewer;
