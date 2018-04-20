import React from 'react';
import PropTypes from 'prop-types';
import AppHeader from './AppHeader';
import AppBody from './AppBody';

const AuthenticatedApp = ({
  admins, user, everyoneCanWrite, loginFunc, logoutFunc, title,
}) => {
  const isAdmin = user && admins.some(a => a.replace('%2E', '.') === user.email);
  return (
    <div className="app">
      <AppHeader
        user={user}
        logoutFunc={logoutFunc}
        title={title}
      />
      <AppBody
        loggedIn={!!user}
        loginFunc={loginFunc}
        readonly={!everyoneCanWrite && !isAdmin}
      />
    </div>
  );
};

AuthenticatedApp.propTypes = {
  admins: PropTypes.arrayOf(PropTypes.string).isRequired,
  user: PropTypes.shape({
    photoURL: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  everyoneCanWrite: PropTypes.bool,
  loginFunc: PropTypes.func.isRequired,
  logoutFunc: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

AuthenticatedApp.defaultProps = {
  user: null,
  everyoneCanWrite: false,
};

export default AuthenticatedApp;
