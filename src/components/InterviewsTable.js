import React from 'react';
import PropTypes from 'prop-types';
import Interview from './Interview';

const InterviewsTable = ({ interviews }) => (
  <table>
    <tbody>
      <tr>
        <th>Date</th>
        <th colSpan="2">Morning</th>
        <th colSpan="2">Afternoon</th>
        <th>Host</th>
      </tr>
      {
        interviews.map(interview => (
          <Interview key={interview.id} {...interview} />
        ))
      }
    </tbody>
  </table>
);

InterviewsTable.propTypes = {
  interviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    morningPair: PropTypes.string.isRequired,
    morningTeam: PropTypes.string.isRequired,
    afternoonPair: PropTypes.string.isRequired,
    afternoonTeam: PropTypes.string.isRequired,
    host: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default InterviewsTable;
