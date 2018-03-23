import React from 'react';
import HostsTable from './HostsTable';

class Hosts extends React.Component {
  constructor() {
    super();
    this.state = {
      hosts: [],
      newHostName: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addHost = this.addHost.bind(this);
  }

  componentDidMount() {
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

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
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
      <div className="Hosts">
        <h1>Hosts</h1>
        <HostsTable hosts={this.state.hosts} />
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

export default Hosts;
