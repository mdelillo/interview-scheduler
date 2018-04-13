import React from 'react';
import PropTypes from 'prop-types';

class NewInterviewer extends React.Component {
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
    return (
      <form name="newInterviewer" onSubmit={this.addInterviewer}>
        <input
          type="text"
          name="newInterviewerName"
          value={this.state.newInterviewerName}
          onChange={this.handleInputChange}
          placeholder="Name"
          required
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
    );
  }
}

NewInterviewer.propTypes = {
  firebase: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default NewInterviewer;
