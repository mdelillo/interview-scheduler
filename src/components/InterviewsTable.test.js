import React from 'react';
import { shallow } from 'enzyme';
import InterviewsTable from './InterviewsTable';
import Interview from './Interview';

describe('InterviewsTable', () => {
  it('shows interviews sorted by date (descending) then id (descending)', () => {
    const interviews = [
      {
        date: '2018-01-01', id: '5', morningPair: '', morningTeam: '', afternoonPair: '', afternoonTeam: '', host: '',
      },
      {
        date: '2018-01-02', id: '6', morningPair: '', morningTeam: '', afternoonPair: '', afternoonTeam: '', host: '',
      },
      {
        date: '2018-01-03', id: '3', morningPair: '', morningTeam: '', afternoonPair: '', afternoonTeam: '', host: '',
      },
      {
        date: '2018-01-04', id: '1', morningPair: '', morningTeam: '', afternoonPair: '', afternoonTeam: '', host: '',
      },
      {
        date: '2018-01-03', id: '4', morningPair: '', morningTeam: '', afternoonPair: '', afternoonTeam: '', host: '',
      },
      {
        date: '2018-01-01', id: '2', morningPair: '', morningTeam: '', afternoonPair: '', afternoonTeam: '', host: '',
      },
    ];
    const expectedInterviewOrder = ['1', '4', '3', '6', '5', '2'];
    const wrapper = shallow(<InterviewsTable interviews={interviews} />);
    expect(wrapper.find(Interview).map(h => h.props().id)).toEqual(expectedInterviewOrder);
  });
});
