import React from 'react';
import PropTypes from 'prop-types';
import HighlightableCell from './HighlightableCell';
import weekNumber from '../weekNumber';

const Interviewer = ({
  date, morningPair, morningTeam, afternoonPair, afternoonTeam, host,
}) => {
  const backgroundColors = ['#ccccff', '#ffcccc', '#ffffcc', '#ccffcc'];
  const bgcolor = backgroundColors[weekNumber(date) % 4];
  return (
    <tr bgcolor={bgcolor}>
      <td>{date}</td>
      <HighlightableCell value={morningPair} />
      <HighlightableCell value={morningTeam} />
      <HighlightableCell value={afternoonPair} />
      <HighlightableCell value={afternoonTeam} />
      <HighlightableCell value={host} />
    </tr>
  );
};

Interviewer.propTypes = {
  date: PropTypes.string.isRequired,
  morningPair: PropTypes.string.isRequired,
  morningTeam: PropTypes.string.isRequired,
  afternoonPair: PropTypes.string.isRequired,
  afternoonTeam: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
};

export default Interviewer;
