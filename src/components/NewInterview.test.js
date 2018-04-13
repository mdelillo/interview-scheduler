import React from 'react';
import { shallow } from 'enzyme';
import NewInterview from './NewInterview';

describe('NewInterview', () => {
  function setText(wrapper, name, value) {
    const element = wrapper.find(`[name="${name}"]`);
    element.simulate('change', { target: { name, value } });
  }

  it('automatically fills in the team if available', () => {
    const interviewers = [
      { name: 'person1', team: 'team1' },
      { name: 'person2', team: 'team1' },
      { name: 'person3', team: 'team2' },
    ];
    const wrapper = shallow(<NewInterview interviewers={interviewers} />);

    setText(wrapper, 'newInterviewMorningPair', 'unknown-person');
    expect(wrapper.state('newInterviewMorningTeam')).toEqual('');

    setText(wrapper, 'newInterviewMorningPair', 'person1');
    expect(wrapper.state('newInterviewMorningTeam')).toEqual('team1');

    setText(wrapper, 'newInterviewMorningPair', 'person2');
    expect(wrapper.state('newInterviewMorningTeam')).toEqual('team1');

    setText(wrapper, 'newInterviewMorningPair', 'person3');
    expect(wrapper.state('newInterviewMorningTeam')).toEqual('team2');

    setText(wrapper, 'newInterviewAfternoonPair', 'unknown-person');
    expect(wrapper.state('newInterviewAfternoonTeam')).toEqual('');

    setText(wrapper, 'newInterviewAfternoonPair', 'person1');
    expect(wrapper.state('newInterviewAfternoonTeam')).toEqual('team1');

    setText(wrapper, 'newInterviewAfternoonPair', 'person2');
    expect(wrapper.state('newInterviewAfternoonTeam')).toEqual('team1');

    setText(wrapper, 'newInterviewAfternoonPair', 'person3');
    expect(wrapper.state('newInterviewAfternoonTeam')).toEqual('team2');
  });
});
