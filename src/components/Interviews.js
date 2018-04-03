import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { firebaseObjectToArray } from '../firebase';
import InterviewsTable from './InterviewsTable';

class Interviews extends React.Component {
  constructor() {
    super();
    this.state = {
      newInterviewDate: '',
      newInterviewMorningPair: '',
      newInterviewMorningTeam: '',
      newInterviewAfternoonPair: '',
      newInterviewAfternoonTeam: '',
      newInterviewHost: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addInterview = this.addInterview.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  addInterview(e) {
    e.preventDefault();
    this.props.firebase.push('/interviews', {
      date: this.state.newInterviewDate,
      morningPair: this.state.newInterviewMorningPair,
      morningTeam: this.state.newInterviewMorningTeam,
      afternoonPair: this.state.newInterviewAfternoonPair,
      afternoonTeam: this.state.newInterviewAfternoonTeam,
      host: this.state.newInterviewHost,
    }).then(() => {
      this.setState({
        newInterviewDate: '',
        newInterviewMorningPair: '',
        newInterviewMorningTeam: '',
        newInterviewAfternoonPair: '',
        newInterviewAfternoonTeam: '',
        newInterviewHost: '',
      });
    });
  }

  render() {
    const { interviews } = this.props;

    if (!isLoaded(interviews)) {
      return <p>Loading interviews</p>;
    } else if (isEmpty(interviews)) {
      return <p>No interviews</p>;
    }

    return (
      <div className="Interviews">
        <InterviewsTable interviews={firebaseObjectToArray(interviews)} />
        <br />
        <form name="newInterview" onSubmit={this.addInterview}>
          <input
            type="text"
            name="newInterviewDate"
            value={this.state.newInterviewDate}
            onChange={this.handleInputChange}
            placeholder="Date"
          />
          <br />
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
      </div>
    );
  }
}

Interviews.propTypes = {
  interviews: PropTypes.object,
  firebase: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Interviews.defaultProps = {
  interviews: {},
};

export default compose(
  firebaseConnect(['interviews']),
  connect(({ firebase }) => ({
    interviews: firebase.data.interviews,
  })),
)(Interviews);
