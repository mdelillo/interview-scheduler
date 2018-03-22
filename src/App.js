import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      interviews: [],
      interviewers: [],
      hosts: [],
      newInterviewDate: '',
      newInterviewMorningPair: '',
      newInterviewMorningTeam: '',
      newInterviewAfternoonPair: '',
      newInterviewAfternoonTeam: '',
      newInterviewHost: '',
      newInterviewerName: '',
      newInterviewerTeam: '',
      newHostName: '',
    };
    this.interviewsTable = this.interviewsTable.bind(this);
    this.interviewersTable = this.interviewersTable.bind(this);
    this.hostsTable = this.hostsTable.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addInterview = this.addInterview.bind(this);
    this.addInterviewer = this.addInterviewer.bind(this);
    this.addHost = this.addHost.bind(this);
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
          morningPair: interviews[interview].morningPair,
          morningTeam: interviews[interview].morningTeam,
          afternoonPair: interviews[interview].afternoonPair,
          afternoonTeam: interviews[interview].afternoonTeam,
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
                <td>{i.morningPair}</td>
                <td>{i.morningTeam}</td>
                <td>{i.afternoonPair}</td>
                <td>{i.afternoonTeam}</td>
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

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  addInterview(e) {
    e.preventDefault();
    const interviewsRef = this.props.firebase.database().ref('interviews');
    const newInterviewRef = interviewsRef.push();
    newInterviewRef.set({
      date: this.state.newInterviewDate,
      morningPair: this.state.newInterviewMorningPair,
      morningTeam: this.state.newInterviewMorningTeam,
      afternoonPair: this.state.newInterviewAfternoonPair,
      afternoonTeam: this.state.newInterviewAfternoonTeam,
      host: this.state.newInterviewHost,
    });
    e.target.reset();
    this.setState({
      newInterviewDate: '',
      newInterviewMorningPair: '',
      newInterviewMorningTeam: '',
      newInterviewAfternoonPair: '',
      newInterviewAfternoonTeam: '',
      newInterviewHost: '',
    });
  }

  addInterviewer(e) {
    e.preventDefault();
    const interviewersRef = this.props.firebase.database().ref('interviewers');
    const newInterviewerRef = interviewersRef.push();
    newInterviewerRef.set({
      name: this.state.newInterviewerName,
      team: this.state.newInterviewerTeam,
    });
    e.target.reset();
    this.setState({
      newInterviewerName: '',
      newInterviewerTeam: '',
    });
  }

  addHost(e) {
    e.preventDefault();
    const hostsRef = this.props.firebase.database().ref('hosts');
    const newHostRef = hostsRef.push();
    newHostRef.set({ name: this.state.newHostName });
    e.target.reset();
    this.setState({ newHostName: '' });
  }

  render() {
    return (
      <div className="App">
        <div className="interviews">
          <h1>Interviews</h1>
          {this.interviewsTable()}
          <form name="newInterview" onSubmit={this.addInterview}>
            <input
              type="text"
              name="newInterviewDate"
              value={this.state.newInterviewDate}
              onChange={this.handleInputChange}
              placeholder="Date"
            />
            <input
              type="text"
              name="newInterviewMorningPair"
              value={this.state.newInterviewMorningPair}
              onChange={this.handleInputChange}
              placeholder="Morning Pair"
            />
            <input
              type="text"
              name="newInterviewMorningTeam"
              value={this.state.newInterviewMorningTeam}
              onChange={this.handleInputChange}
              placeholder="Morning Team"
            />
            <input
              type="text"
              name="newInterviewAfternoonPair"
              value={this.state.newInterviewAfternoonPair}
              onChange={this.handleInputChange}
              placeholder="Afternoon Pair"
            />
            <input
              type="text"
              name="newInterviewAfternoonTeam"
              value={this.state.newInterviewAfternoonTeam}
              onChange={this.handleInputChange}
              placeholder="Afternoon Team"
            />
            <input
              type="text"
              name="newInterviewHost"
              value={this.state.newInterviewHost}
              onChange={this.handleInputChange}
              placeholder="Host"
            />
            <input
              type="submit"
              value="Add Interview"
            />
          </form>
        </div>
        <div className="interviewers">
          <h1>Interviewers</h1>
          {this.interviewersTable()}
          <form name="newInterviewer" onSubmit={this.addInterviewer}>
            <input
              type="text"
              name="newInterviewerName"
              value={this.state.newInterviewerName}
              onChange={this.handleInputChange}
              placeholder="Name"
            />
            <input
              type="text"
              name="newInterviewerTeam"
              value={this.state.newInterviewerTeam}
              onChange={this.handleInputChange}
              placeholder="Team"
            />
            <input
              type="submit"
              value="Add Interviewer"
            />
          </form>
        </div>
        <div className="hosts">
          <h1>Hosts</h1>
          {this.hostsTable()}
          <form name="newHost" onSubmit={this.addHost}>
            <input
              type="text"
              name="newHostName"
              value={this.state.newHostName}
              onChange={this.handleInputChange}
              placeholder="Name"
            />
            <input
              type="submit"
              value="Add Host"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
