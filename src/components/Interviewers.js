import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { firebaseObjectToArray } from '../firebase';
import InterviewersTable from './InterviewersTable';

class Interviewers extends React.Component {
  constructor() {
    super();
    this.state = {
      newInterviewerName: '',
      newInterviewerTeam: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addInterviewer = this.addInterviewer.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  addInterviewer(e) {
    e.preventDefault();
    this.props.firebase.push('/interviewers', {
      name: this.state.newInterviewerName,
      team: this.state.newInterviewerTeam,
    }).then(() => {
      this.setState({
        newInterviewerName: '',
        newInterviewerTeam: '',
      });
    });
  }

  render() {
    const { interviewers } = this.props;

    if (!isLoaded(interviewers)) {
      return <p>Loading interviewers</p>;
    } else if (isEmpty(interviewers)) {
      return <p>No interviewers</p>;
    }

    return (
      <div className="Interviewers">
        <h1>Interviewers</h1>
        <InterviewersTable interviewers={firebaseObjectToArray(interviewers)} />
        <br />
        <form name="newInterviewer" onSubmit={this.addInterviewer}>
          <input
            type="text"
            name="newInterviewerName"
            value={this.state.newInterviewerName}
            onChange={this.handleInputChange}
            placeholder="Name"
          />
          <br />
          <input
            type="text"
            name="newInterviewerTeam"
            value={this.state.newInterviewerTeam}
            onChange={this.handleInputChange}
            placeholder="Team"
          />
          <br />
          <input
            type="submit"
            value="Add Interviewer"
          />
        </form>
      </div>
    );
  }
}

export default compose(
  firebaseConnect(['interviewers']),
  connect(({ firebase }) => ({
    interviewers: firebase.data.interviewers,
  })),
)(Interviewers);
