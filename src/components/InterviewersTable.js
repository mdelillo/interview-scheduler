import React from 'react';
import PropTypes from 'prop-types';
import Interviewer from './Interviewer';
import { sortInterviewers } from '../sort';

const InterviewersTable = ({ interviewers, interviews }) => (
  <table>
    <tbody>
      {
        sortInterviewers(interviewers, interviews).map(interviewer => (
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
  interviews: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    morningPair: PropTypes.string.isRequired,
    afternoonPair: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default InterviewersTable;
