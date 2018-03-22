import React from 'react';

class Interviews extends React.Component {
  constructor() {
    super();
    this.state = {
      interviews: [],
      newInterviewDate: '',
      newInterviewMorningPair: '',
      newInterviewMorningTeam: '',
      newInterviewAfternoonPair: '',
      newInterviewAfternoonTeam: '',
      newInterviewHost: '',
    };
    this.interviewsTable = this.interviewsTable.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addInterview = this.addInterview.bind(this);
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

  render() {
    return (
      <div className="Interviews">
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
    );
  }
}

export default Interviews;
