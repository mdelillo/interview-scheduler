import React from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import MdDelete from 'react-icons/lib/md/delete';
import HighlightableCell from './HighlightableCell';

const Interviewer = ({
  firebase, id, name, team,
}) => {
  const removeInterviewer = () => { firebase.remove(`interviewers/${id}`); };
  return (
    <tr>
      <HighlightableCell value={name} />
      <HighlightableCell value={team} />
      <td><span className="clickable"><MdDelete onClick={removeInterviewer} /></span></td>
    </tr>
  );
};

Interviewer.propTypes = {
  firebase: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired,
};

export default firebaseConnect()(Interviewer);
