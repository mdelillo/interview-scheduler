import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { firebaseObjectToArray } from '../firebase';
import InterviewsTable from './InterviewsTable';
import NewInterview from './NewInterview';
import Spinner from './Spinner';

const Interviews = ({
  firebase, interviews, interviewers, readonly,
}) => {
  if (!isLoaded(interviews) || !isLoaded(interviewers)) {
    return <Spinner text="Loading interviews" />;
  } else if (isEmpty(interviews)) {
    return <p>No interviews</p>;
  }

  return (
    <div className="Interviews">
      <InterviewsTable interviews={firebaseObjectToArray(interviews)} readonly={readonly} />
      <br />
      { readonly ||
        <NewInterview interviewers={firebaseObjectToArray(interviewers)} firebase={firebase} />
      }
    </div>
  );
};

Interviews.propTypes = {
  interviews: PropTypes.object.isRequired,
  interviewers: PropTypes.object.isRequired,
  firebase: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  readonly: PropTypes.bool.isRequired,
};

export default compose(
  firebaseConnect(['interviews, interviewers']),
  connect(({ firebase }) => ({
    interviews: firebase.data.interviews,
    interviewers: firebase.data.interviewers,
  })),
)(Interviews);
