import React from 'react';
import PropTypes from 'prop-types';
import Host from './Host';
import { sortHosts } from '../sort';

const HostsTable = ({ hosts, interviews }) => (
  <table>
    <tbody>
      {
        sortHosts(hosts, interviews).map(host => (
          <Host key={host.id} {...host} />
        ))
      }
    </tbody>
  </table>
);

HostsTable.propTypes = {
  hosts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  interviews: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    host: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default HostsTable;
