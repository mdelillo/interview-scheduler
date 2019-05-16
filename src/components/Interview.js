import React from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import { MdDelete } from 'react-icons/md';
import HighlightableCell from './HighlightableCell';
import weekNumber from '../weekNumber';

const Interview = ({
  firebase, id, date, morningPair, morningTeam, afternoonPair, afternoonTeam, host, readonly,
}) => {
  const removeInterview = () => { firebase.remove(`interviews/${id}`); };
  const backgroundColors = ['#ccccff', '#ffcccc', '#ffffcc', '#ccffcc'];
  const bgcolor = backgroundColors[weekNumber(date) % 4];
  return (
    <tr bgcolor={bgcolor}>
      <td>{date}</td>
      <HighlightableCell value={morningPair} />
      <HighlightableCell value={morningTeam} />
      <HighlightableCell value={afternoonPair} />
      <HighlightableCell value={afternoonTeam} />
      <HighlightableCell value={host} />
      { readonly ||
        <td><span className="clickable"><MdDelete onClick={removeInterview} /></span></td>
      }
    </tr>
  );
};

Interview.propTypes = {
  firebase: PropTypes.shape({
    remove: PropTypes.func.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  morningPair: PropTypes.string.isRequired,
  morningTeam: PropTypes.string.isRequired,
  afternoonPair: PropTypes.string.isRequired,
  afternoonTeam: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  readonly: PropTypes.bool.isRequired,
};

export default firebaseConnect()(Interview);
