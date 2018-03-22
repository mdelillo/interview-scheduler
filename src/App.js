import React from 'react';
import './App.css';
import Interviews from './components/Interviews';
import Interviewers from './components/Interviewers';
import Hosts from './components/Hosts';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Interviews firebase={this.props.firebase} />
        <Interviewers firebase={this.props.firebase} />
        <Hosts firebase={this.props.firebase} />
      </div>
    );
  }
}

export default App;
