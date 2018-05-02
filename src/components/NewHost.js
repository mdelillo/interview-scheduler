import React from 'react';
import PropTypes from 'prop-types';

class NewHost extends React.Component {
  constructor() {
    super();
    this.state = {
      newHostName: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addHost = this.addHost.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  addHost(e) {
    e.preventDefault();
    this.props.firebase.push('/hosts', { name: this.state.newHostName.trim() })
      .then(() => {
        this.setState({ newHostName: '' });
      });
  }

  render() {
    return (
      <form name="newHost" onSubmit={this.addHost}>
        <input
          type="text"
          name="newHostName"
          value={this.state.newHostName}
          onChange={this.handleInputChange}
          placeholder="Name"
          required
        />
        <br />
        <input
          type="submit"
          value="Add Host"
        />
      </form>
    );
  }
}

NewHost.propTypes = {
  firebase: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default NewHost;
