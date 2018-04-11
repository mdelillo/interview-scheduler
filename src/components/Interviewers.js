import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { firebaseObjectToArray } from '../firebase';
import InterviewersTable from './InterviewersTable';
import NewInterviewer from './NewInterviewer';

const Interviewers = ({ firebase, interviewers, interviews }) => {
  if (!isLoaded(interviewers) || !isLoaded(interviews)) {
    return <p>Loading interviewers</p>;
  } else if (isEmpty(interviewers)) {
    return <p>No interviewers</p>;
  }

  return (
    <div className="Interviewers">
      <h2>Interviewers</h2>
      <InterviewersTable
        interviewers={firebaseObjectToArray(interviewers)}
        interviews={firebaseObjectToArray(interviews)}
      />
      <br />
      <NewInterviewer firebase={firebase} />
    </div>
  );
};

Interviewers.propTypes = {
  interviewers: PropTypes.object,
  interviews: PropTypes.object,
  firebase: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Interviewers.defaultProps = {
  interviewers: {},
  interviews: {},
};

export default compose(
  firebaseConnect(['interviewers', 'interviews']),
  connect(({ firebase }) => ({
    interviewers: firebase.data.interviewers,
    interviews: firebase.data.interviews,
  })),
)(Interviewers);
