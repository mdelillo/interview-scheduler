import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class NewInterview extends React.Component {
  constructor() {
    super();
    this.state = {
      newInterviewDate: null,
      newInterviewMorningPair: '',
      newInterviewMorningTeam: '',
      newInterviewAfternoonPair: '',
      newInterviewAfternoonTeam: '',
      newInterviewHost: '',
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addInterview = this.addInterview.bind(this);
    this.datepicker = React.createRef();
  }

  handleDateChange(date) {
    this.setState({
      newInterviewDate: date,
    });
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    const interviewer = this.props.interviewers.find(i => i.name === e.target.value);
    if (interviewer) {
      if (e.target.name === 'newInterviewMorningPair') {
        this.setState({
          newInterviewMorningTeam: interviewer.team,
        });
      } else if (e.target.name === 'newInterviewAfternoonPair') {
        this.setState({
          newInterviewAfternoonTeam: interviewer.team,
        });
      }
    }
  }

  addInterview(e) {
    e.preventDefault();
    this.props.firebase.push('/interviews', {
      date: this.state.newInterviewDate.format('YYYY-MM-DD'),
      morningPair: this.state.newInterviewMorningPair.trim(),
      morningTeam: this.state.newInterviewMorningTeam.trim(),
      afternoonPair: this.state.newInterviewAfternoonPair.trim(),
      afternoonTeam: this.state.newInterviewAfternoonTeam.trim(),
      host: this.state.newInterviewHost.trim(),
    }).then(() => {
      this.setState({
        newInterviewDate: null,
        newInterviewMorningPair: '',
        newInterviewMorningTeam: '',
        newInterviewAfternoonPair: '',
        newInterviewAfternoonTeam: '',
        newInterviewHost: '',
      });
      if (this.datepicker.current) {
        this.datepicker.current.setFocus(true);
        this.datepicker.current.setOpen(false);
      }
    });
  }

  render() {
    return (
      <form name="newInterview" onSubmit={this.addInterview}>
        <DatePicker
          selected={this.state.newInterviewDate}
          onChange={this.handleDateChange}
          dateFormat="YYYY-MM-DD"
          placeholderText="Date"
          ref={this.datepicker}
          required
        />
        <input
          type="text"
          name="newInterviewMorningPair"
          value={this.state.newInterviewMorningPair}
          onChange={this.handleInputChange}
          placeholder="Morning Pair"
        />
        <br />
        <input
          type="text"
          name="newInterviewMorningTeam"
          value={this.state.newInterviewMorningTeam}
          onChange={this.handleInputChange}
          placeholder="Morning Team"
        />
        <br />
        <input
          type="text"
          name="newInterviewAfternoonPair"
          value={this.state.newInterviewAfternoonPair}
          onChange={this.handleInputChange}
          placeholder="Afternoon Pair"
        />
        <br />
        <input
          type="text"
          name="newInterviewAfternoonTeam"
          value={this.state.newInterviewAfternoonTeam}
          onChange={this.handleInputChange}
          placeholder="Afternoon Team"
        />
        <br />
        <input
          type="text"
          name="newInterviewHost"
          value={this.state.newInterviewHost}
          onChange={this.handleInputChange}
          placeholder="Host"
        />
        <br />
        <input
          type="submit"
          value="Add Interview"
        />
      </form>
    );
  }
}

NewInterview.propTypes = {
  interviewers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    team: PropTypes.string.isRequired,
  }).isRequired),
  firebase: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

NewInterview.defaultProps = {
  interviewers: [],
};

export default NewInterview;
