import React from 'react';
import PropTypes from 'prop-types';
import Interviewer from './Interviewer';
import { sortInterviewers } from '../sort';

const InterviewersTable = ({ interviewers, interviews, readonly }) => (
  <table>
    <tbody>
      {
        sortInterviewers(interviewers, interviews).map(interviewer => (
          <Interviewer key={interviewer.id} readonly={readonly} {...interviewer} />
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
  readonly: PropTypes.bool.isRequired,
};

export default InterviewersTable;
