import React from 'react';
import PropTypes from 'prop-types';
import Host from './Host';

const HostsTable = ({ hosts }) => (
  <table>
    <tbody>
      {
        hosts.map(host => (
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
};

export default HostsTable;
