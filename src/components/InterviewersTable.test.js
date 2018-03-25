import React from 'react';
import { shallow } from 'enzyme';
import InterviewersTable from './InterviewersTable';
import Interviewer from './Interviewer';

describe('InterviewersTable', () => {
  it('shows interviewers sorted by recency then name', () => {
    const interviewers = [
      { id: '1', name: 'alpha', team: '' },
      { id: '2', name: 'bravo', team: '' },
      { id: '3', name: 'charlie', team: '' },
      { id: '4', name: 'delta', team: '' },
      { id: '5', name: 'foxtrot', team: '' },
      { id: '6', name: 'golf', team: '' },
      { id: '7', name: 'echo', team: '' },
      { id: '8', name: 'hotel', team: '' },
    ];
    const interviews = [
      { date: '2018-01-01', morningPair: 'alpha', afternoonPair: 'delta' },
      { date: '2018-01-03', morningPair: 'delta', afternoonPair: 'charlie' },
      { date: '2018-01-02', morningPair: 'bravo', afternoonPair: 'golf' },
    ];
    const expectedInterviewerOrder = ['echo', 'foxtrot', 'hotel', 'alpha', 'bravo', 'golf', 'charlie', 'delta'];
    const wrapper = shallow(<InterviewersTable interviewers={interviewers} interviews={interviews} />);
    expect(wrapper.find(Interviewer).map(h => h.props().name)).toEqual(expectedInterviewerOrder);
  });
});
