import React from 'react';
import firebase from 'firebase';
import './App.css';
import AppHeader from './components/AppHeader';
import AppBody from './components/AppBody';

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
    this.state = { user: null };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
    document.addEventListener('click', closeDropdowns);
  }

  componentWillUnmount() {
    document.removeEventListener('click', closeDropdowns);
  }

  logout() {
    firebase.auth().signOut()
      .then(() => { this.setState({ user: null }); });
  }

  login() {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => { this.setState({ user: result.user }); });
  }

  render() {
    return (
      <div className="app">
        <AppHeader user={this.state.user} logoutFunc={this.logout} />
        <AppBody loggedIn={!!this.state.user} loginFunc={this.login} />
      </div>
    );
  }
}

export default App;
