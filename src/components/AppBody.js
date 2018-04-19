import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import Interviews from './Interviews';
import Interviewers from './Interviewers';
import Hosts from './Hosts';
import Notes from './Notes';

const AppBody = ({ loggedIn, loginFunc, readonly }) => {
  if (!loggedIn) {
    return (
      <div className="AppBody">
        <button className="login-button" onClick={loginFunc}>Log In</button>
      </div>
    );
  }
  return (
    <div className="AppBody">
      <Interviews readonly={readonly} />
      <Interviewers readonly={readonly} />
      <Hosts readonly={readonly} />
      <Notes readonly={readonly} />
    </div>
  );
};

AppBody.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  loginFunc: PropTypes.func.isRequired,
  readonly: PropTypes.bool.isRequired,
};

export default AppBody;
