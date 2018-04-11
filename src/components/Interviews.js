import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { firebaseObjectToArray } from '../firebase';
import InterviewsTable from './InterviewsTable';
import NewInterview from './NewInterview';

const Interviews = ({ firebase, interviews }) => {
  if (!isLoaded(interviews)) {
    return <p>Loading interviews</p>;
  } else if (isEmpty(interviews)) {
    return <p>No interviews</p>;
  }

  return (
    <div className="Interviews">
      <InterviewsTable interviews={firebaseObjectToArray(interviews)} />
      <br />
      <NewInterview firebase={firebase} />
    </div>
  );
};

Interviews.propTypes = {
  interviews: PropTypes.object,
  firebase: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Interviews.defaultProps = {
  interviews: {},
};

export default compose(
  firebaseConnect(['interviews']),
  connect(({ firebase }) => ({
    interviews: firebase.data.interviews,
  })),
)(Interviews);
