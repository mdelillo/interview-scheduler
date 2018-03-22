import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      interviews: [],
      interviewers: [],
      hosts: [],
    };
    this.interviewsTable = this.interviewsTable.bind(this);
    this.interviewersTable = this.interviewersTable.bind(this);
    this.hostsTable = this.hostsTable.bind(this);
  }

  componentDidMount() {
    const interviewsRef = this.props.firebase.database().ref('interviews');
    interviewsRef.on('value', (snapshot) => {
      const interviews = snapshot.val();
      const newState = [];
      for (const interview in interviews) {
        newState.push({
          id: interview,
          date: interviews[interview].date,
          morning_pair: interviews[interview].morning_pair,
          morning_team: interviews[interview].morning_team,
          afternoon_pair: interviews[interview].afternoon_pair,
          afternoon_team: interviews[interview].afternoon_team,
          host: interviews[interview].host,
        });
      }
      this.setState({
        interviews: newState,
      });
    });

    const interviewersRef = this.props.firebase.database().ref('interviewers');
    interviewersRef.on('value', (snapshot) => {
      const interviewers = snapshot.val();
      const newState = [];
      for (const interviewer in interviewers) {
        newState.push({
          id: interviewer,
          name: interviewers[interviewer].name,
          team: interviewers[interviewer].team,
        });
      }
      this.setState({
        interviewers: newState,
      });
    });

    const hostsRef = this.props.firebase.database().ref('hosts');
    hostsRef.on('value', (snapshot) => {
      const hosts = snapshot.val();
      const newState = [];
      for (const host in hosts) {
        newState.push({
          id: host,
          name: hosts[host].name,
        });
      }
      this.setState({
        hosts: newState,
      });
    });
  }

  interviewsTable() {
    return (
      <table>
        <tbody>
          <tr>
            <th>Date</th>
            <th colSpan="2">Morning</th>
            <th colSpan="2">Afternoon</th>
            <th>Host</th>
          </tr>
          {
            this.state.interviews.map(i => (
              <tr key={i.id}>
                <td>{i.date}</td>
                <td>{i.morning_pair}</td>
                <td>{i.morning_team}</td>
                <td>{i.afternoon_pair}</td>
                <td>{i.afternoon_team}</td>
                <td>{i.host}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }

  interviewersTable() {
    return (
      <table>
        <tbody>
          {
            this.state.interviewers.map(i => (
              <tr key={i.id}>
                <td>{i.name}</td>
                <td>{i.team}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }

  hostsTable() {
    return (
      <table>
        <tbody>
          {
            this.state.hosts.map(h => (
              <tr key={h.id}>
                <td>{h.name}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="interviews">
          <h1>Interviews</h1>
          {this.interviewsTable()}
        </div>
        <div className="interviewers">
          <h1>Interviewers</h1>
          {this.interviewersTable()}
        </div>
        <div className="hosts">
          <h1>Hosts</h1>
          {this.hostsTable()}
        </div>
      </div>
    );
  }
}

export default App;
