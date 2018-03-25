import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { firebaseObjectToArray } from '../firebase';
import HostsTable from './HostsTable';

class Hosts extends React.Component {
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
    this.props.firebase.push('/hosts', { name: this.state.newHostName })
      .then(() => {
        this.setState({ newHostName: '' });
      });
  }

  render() {
    const { hosts, interviews } = this.props;

    if (!isLoaded(hosts) || !isLoaded(interviews)) {
      return <p>Loading hosts</p>;
    } else if (isEmpty(hosts)) {
      return <p>No hosts</p>;
    }

    return (
      <div className="Hosts">
        <h1>Hosts</h1>
        <HostsTable
          hosts={firebaseObjectToArray(hosts)}
          interviews={firebaseObjectToArray(interviews)}
        />
        <br />
        <form name="newHost" onSubmit={this.addHost}>
          <input
            type="text"
            name="newHostName"
            value={this.state.newHostName}
            onChange={this.handleInputChange}
            placeholder="Name"
          />
          <br />
          <input
            type="submit"
            value="Add Host"
          />
        </form>
      </div>
    );
  }
}

export default compose(
  firebaseConnect(['hosts', 'interviews']),
  connect(({ firebase }) => ({
    hosts: firebase.data.hosts,
    interviews: firebase.data.interviews,
  })),
)(Hosts);
