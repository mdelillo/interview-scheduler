import React from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import MdDelete from 'react-icons/lib/md/delete';
import HighlightableCell from './HighlightableCell';

const Host = ({ firebase, id, name }) => {
  const removeHost = () => { firebase.remove(`hosts/${id}`); };
  return (
    <tr>
      <HighlightableCell value={name} />
      <td><span className="clickable"><MdDelete onClick={removeHost} /></span></td>
    </tr>
  );
};

Host.propTypes = {
  firebase: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default firebaseConnect()(Host);
