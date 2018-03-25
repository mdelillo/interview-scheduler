import React from 'react';
import { shallow } from 'enzyme';
import HostsTable from './HostsTable';
import Host from './Host';

describe('HostsTable', () => {
  it('shows hosts sorted by recency then name', () => {
    const hosts = [
      { id: '1', name: 'alpha' },
      { id: '2', name: 'bravo' },
      { id: '3', name: 'charlie' },
      { id: '4', name: 'delta' },
      { id: '5', name: 'foxtrot' },
      { id: '6', name: 'echo' },
    ];
    const interviews = [
      { date: '2018-01-01', host: 'alpha' },
      { date: '2018-01-03', host: 'delta' },
      { date: '2018-01-02', host: 'charlie' },
      { date: '2018-01-04', host: 'alpha' },
    ];
    const expectedHostOrder = ['bravo', 'echo', 'foxtrot', 'charlie', 'delta', 'alpha'];
    const wrapper = shallow(<HostsTable hosts={hosts} interviews={interviews} />);
    expect(wrapper.find(Host).map(h => h.props().name)).toEqual(expectedHostOrder);
  });
});
