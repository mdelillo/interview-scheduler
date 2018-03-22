import React from 'react';

class Interviewers extends React.Component {
  constructor() {
    super();
    this.state = {
      interviewers: [],
      newInterviewerName: '',
      newInterviewerTeam: '',
    };
    this.interviewersTable = this.interviewersTable.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addInterviewer = this.addInterviewer.bind(this);
  }

  componentDidMount() {
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

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
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

  render() {
    return (
      <div className="Interviewers">
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
    );
  }
}

export default Interviewers;
