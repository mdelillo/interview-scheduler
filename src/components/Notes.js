import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';


const Notes = ({ firebase, notes }) => (
  <div className="Notes">
    <h2>Notes</h2>
    <textarea
      name="notes"
      value={notes || ''}
      onChange={(e) => { firebase.set('notes', e.target.value); }}
    />
  </div>
);

Notes.propTypes = {
  notes: PropTypes.string,
  firebase: PropTypes.shape({
    set: PropTypes.func.isRequired,
  }).isRequired,
};

Notes.defaultProps = {
  notes: '',
};

export default compose(
  firebaseConnect(['notes']),
  connect(({ firebase }) => ({
    notes: firebase.data.notes,
  })),
)(Notes);
