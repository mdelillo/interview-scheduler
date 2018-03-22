import React from 'react';
import PropTypes from 'prop-types';
import Interviewer from './Interviewer';

const InterviewersTable = ({ interviewers }) => (
  <table>
    <tbody>
      {
        interviewers.map(interviewer => (
          <Interviewer key={interviewer.id} {...interviewer} />
        ))
      }
    </tbody>
  </table>
);

InterviewersTable.propTypes = {
  interviewers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    team: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default InterviewersTable;
