import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { firebaseObjectToArray } from '../firebase';
import HostsTable from './HostsTable';
import NewHost from './NewHost';

const Hosts = ({ firebase, hosts, interviews }) => {
  if (!isLoaded(hosts) || !isLoaded(interviews)) {
    return <p>Loading hosts</p>;
  } else if (isEmpty(hosts)) {
    return <p>No hosts</p>;
  }

  return (
    <div className="Hosts">
      <h2>Hosts</h2>
      <HostsTable
        hosts={firebaseObjectToArray(hosts)}
        interviews={firebaseObjectToArray(interviews)}
      />
      <br />
      <NewHost firebase={firebase} />
    </div>
  );
};

Hosts.propTypes = {
  hosts: PropTypes.object,
  interviews: PropTypes.object,
  firebase: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Hosts.defaultProps = {
  hosts: {},
  interviews: {},
};

export default compose(
  firebaseConnect(['hosts', 'interviews']),
  connect(({ firebase }) => ({
    hosts: firebase.data.hosts,
    interviews: firebase.data.interviews,
  })),
)(Hosts);
