import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import Spinner from './Spinner';

const Notes = ({ firebase, notes }) => {
  if (!isLoaded(notes)) {
    return <Spinner text="Loading notes" />;
  }

  return (
    <div className="Notes">
      <h2>Notes</h2>
      <textarea
        name="notes"
        value={notes || ''}
        onChange={(e) => { firebase.set('notes', e.target.value); }}
      />
    </div>
  );
};

Notes.propTypes = {
  notes: PropTypes.string.isRequired,
  firebase: PropTypes.shape({
    set: PropTypes.func.isRequired,
  }).isRequired,
};

export default compose(
  firebaseConnect(['notes']),
  connect(({ firebase }) => ({
    notes: firebase.data.notes,
  })),
)(Notes);
