import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const AppHeader = ({ user, logoutFunc, title }) => {
  if (!user) {
    return (
      <header className="AppHeader">
        <div><h1>{title}</h1></div>
      </header>
    );
  }
  const showMenu = () => { document.getElementById('user-menu').classList.toggle('show'); };
  return (
    <header className="AppHeader">
      <div><h1>{title}</h1></div>
      <div className="right dropdown">
        <div role="presentation" onClick={showMenu} onKeyPress={showMenu} >
          <img src={user.photoURL} alt={user.displayName} className="dropdown-button" />
        </div>
        <div id="user-menu" className="dropdown-content">
          <button onClick={logoutFunc}>Log Out</button>
        </div>
      </div>
    </header>
  );
};

AppHeader.propTypes = {
  user: PropTypes.shape({
    photoURL: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
  }),
  logoutFunc: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

AppHeader.defaultProps = {
  user: null,
};

export default AppHeader;
