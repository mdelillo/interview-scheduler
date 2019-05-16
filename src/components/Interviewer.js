import React from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import { MdDelete } from 'react-icons/md';
import HighlightableCell from './HighlightableCell';

const Interviewer = ({
  firebase, id, name, team, readonly,
}) => {
  const removeInterviewer = () => { firebase.remove(`interviewers/${id}`); };
  return (
    <tr>
      <HighlightableCell value={name} />
      <HighlightableCell value={team} />
      { readonly ||
        <td><span className="clickable"><MdDelete onClick={removeInterviewer} /></span></td>
      }
    </tr>
  );
};

Interviewer.propTypes = {
  firebase: PropTypes.shape({
    remove: PropTypes.func.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired,
  readonly: PropTypes.bool.isRequired,
};

export default firebaseConnect()(Interviewer);
