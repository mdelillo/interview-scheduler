import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import Interviews from './Interviews';
import Interviewers from './Interviewers';
import Hosts from './Hosts';

const AppBody = ({ loggedIn, loginFunc }) => {
  if (!loggedIn) {
    return (
      <div className="AppBody">
        <button className="login-button" onClick={loginFunc}>Log In</button>
      </div>
    );
  }
  return (
    <div className="AppBody">
      <Interviews />
      <Interviewers />
      <Hosts />
    </div>
  );
};

AppBody.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  loginFunc: PropTypes.func.isRequired,
};

export default AppBody;
