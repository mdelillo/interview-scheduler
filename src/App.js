import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import './App.css';
import AuthenticatedApp from './components/AuthenticatedApp';

function closeDropdowns(e) {
  if (!e.target.matches('.dropdown-button')) {
    const dropdowns = document.getElementsByClassName('dropdown-content');
    for (let i = 0; i < dropdowns.length; i += 1) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = { user: null, admins: [] };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        firebase.database().ref('admins').on('value', (snapshot) => {
          this.setState({ admins: Object.keys(snapshot.val()).map(a => a.replace('%2E', '.')) });
        });
      }
    });
    document.addEventListener('click', closeDropdowns);
  }

  componentWillUnmount() {
    document.removeEventListener('click', closeDropdowns);
  }

  logout() {
    firebase.auth().signOut()
      .then(() => {
        this.setState({ user: null, admins: [] });
      });
  }

  login() {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => { this.setState({ user: result.user }); });
  }

  render() {
    return (
      <AuthenticatedApp
        admins={this.state.admins}
        user={this.state.user}
        everyoneCanWrite={this.props.everyoneCanWrite}
        loginFunc={this.login}
        logoutFunc={this.logout}
      />
    );
  }
}

App.propTypes = {
  everyoneCanWrite: PropTypes.bool,
};

App.defaultProps = {
  everyoneCanWrite: false,
};

export default App;
