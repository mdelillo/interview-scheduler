import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { firebaseObjectToArray } from '../firebase';
import InterviewersTable from './InterviewersTable';
import NewInterviewer from './NewInterviewer';
import Spinner from './Spinner';

const Interviewers = ({
  firebase, interviewers, interviews, readonly,
}) => {
  if (!isLoaded(interviewers) || !isLoaded(interviews)) {
    return <Spinner text="Loading interviewers" />;
  }

  return (
    <div className="Interviewers">
      <h2>Interviewers</h2>
      <InterviewersTable
        interviewers={firebaseObjectToArray(interviewers)}
        interviews={firebaseObjectToArray(interviews)}
        readonly={readonly}
      />
      <br />
      { readonly ||
        <NewInterviewer firebase={firebase} />
      }
    </div>
  );
};

Interviewers.propTypes = {
  interviewers: PropTypes.object.isRequired,
  interviews: PropTypes.object.isRequired,
  firebase: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  readonly: PropTypes.bool.isRequired,
};

export default compose(
  firebaseConnect(['interviewers', 'interviews']),
  connect(({ firebase }) => ({
    interviewers: firebase.data.interviewers,
    interviews: firebase.data.interviews,
  })),
)(Interviewers);
