import React from 'react';
import { mount } from 'enzyme';
import firebase from 'firebase';
import App from './App';

let firebaseApp;
let wrapper;

const asyncFlush = () => new Promise(resolve => setTimeout(resolve, 0));

function setText(inputName, value) {
  const input = wrapper.find(`input[name="${inputName}"]`);
  input.instance().value = value;
  input.simulate('change');
}

function submit(name) {
  wrapper.find(`[name="${name}"]`).simulate('submit');
}

beforeEach(() => {
  const config = {
    apiKey: process.env.FIREBASE_TEST_API_KEY,
    authDomain: process.env.FIREBASE_TEST_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_TEST_DATABASE_URL,
    projectId: process.env.FIREBASE_TEST_PROJECT_ID,
    storageBucket: process.env.FIREBASE_TEST_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_TEST_MESSAGING_SENDER_ID,
  };
  firebaseApp = firebase.initializeApp(config, `test-${new Date().getTime()}`);
});

describe('interviews', () => {
  beforeEach(async () => {
    const interviewsRef = firebaseApp.database().ref('interviews');
    interviewsRef.push({
      date: '2018-01-03',
      morningPair: 'interviewer-1',
      morningTeam: 'team-1',
      afternoonPair: 'interviewer-2',
      afternoonTeam: 'team-2',
      host: 'host-1',
    });
    interviewsRef.push({
      date: '2018-01-04',
      morningPair: 'interviewer-3',
      morningTeam: 'team-3',
      afternoonPair: 'interviewer-4',
      afternoonTeam: 'team-4',
      host: 'host-2',
    });

    wrapper = mount(<App firebase={firebaseApp} />);
    await asyncFlush();
  });

  afterEach(() => {
    wrapper.unmount();
    firebaseApp.database().ref('interviews').remove();
  });

  it('shows interviews', (done) => {
    setTimeout(() => {
      expect(wrapper.text()).toContain('Interviews');
      expect(wrapper.text()).toContain('Date');
      expect(wrapper.text()).toContain('Morning');
      expect(wrapper.text()).toContain('Afternoon');
      expect(wrapper.text()).toContain('Host');

      expect(wrapper.text()).toContain('2018-01-03');
      expect(wrapper.text()).toContain('interviewer-1');
      expect(wrapper.text()).toContain('team-1');
      expect(wrapper.text()).toContain('interviewer-2');
      expect(wrapper.text()).toContain('team-2');
      expect(wrapper.text()).toContain('host-1');

      expect(wrapper.text()).toContain('2018-01-04');
      expect(wrapper.text()).toContain('interviewer-3');
      expect(wrapper.text()).toContain('team-3');
      expect(wrapper.text()).toContain('interviewer-4');
      expect(wrapper.text()).toContain('team-4');
      expect(wrapper.text()).toContain('host-2');
      done();
    }, 1000);
  });

  it('adds new interviews', (done) => {
    expect(wrapper.text()).not.toContain('2018-01-10');
    expect(wrapper.text()).not.toContain('morning-pair');
    expect(wrapper.text()).not.toContain('morning-team');
    expect(wrapper.text()).not.toContain('afternoon-pair');
    expect(wrapper.text()).not.toContain('afternoon-team');
    expect(wrapper.text()).not.toContain('host');

    setTimeout(() => {
      setText('newInterviewDate', '2018-01-10');
      setText('newInterviewMorningPair', 'morning-pair');
      setText('newInterviewMorningTeam', 'morning-team');
      setText('newInterviewAfternoonPair', 'afternoon-pair');
      setText('newInterviewAfternoonTeam', 'afternoon-team');
      setText('newInterviewHost', 'host');
      submit('newInterview');

      expect(wrapper.text()).toContain('2018-01-10');
      expect(wrapper.text()).toContain('morning-pair');
      expect(wrapper.text()).toContain('morning-team');
      expect(wrapper.text()).toContain('afternoon-pair');
      expect(wrapper.text()).toContain('afternoon-team');
      expect(wrapper.text()).toContain('host');

      wrapper.unmount();
      wrapper = mount(<App firebase={firebaseApp} />);

      expect(wrapper.text()).toContain('2018-01-10');
      expect(wrapper.text()).toContain('morning-pair');
      expect(wrapper.text()).toContain('morning-team');
      expect(wrapper.text()).toContain('afternoon-pair');
      expect(wrapper.text()).toContain('afternoon-team');
      expect(wrapper.text()).toContain('host');
      done();
    }, 1000);
  });
});

describe('interviewers', () => {
  beforeEach(async () => {
    const interviewersRef = firebaseApp.database().ref('interviewers');
    interviewersRef.push({ name: 'interviewer-1', team: 'team-1' });
    interviewersRef.push({ name: 'interviewer-2', team: 'team-2' });
    interviewersRef.push({ name: 'interviewer-3', team: 'team-3' });

    wrapper = mount(<App firebase={firebaseApp} />);
    await asyncFlush();
  });

  afterEach(() => {
    wrapper.unmount();
    firebaseApp.database().ref('interviewers').remove();
  });

  it('shows interviewers and teams', (done) => {
    setTimeout(() => {
      expect(wrapper.text()).toContain('Interviewers');

      expect(wrapper.text()).toContain('interviewer-1');
      expect(wrapper.text()).toContain('interviewer-2');
      expect(wrapper.text()).toContain('interviewer-3');
      expect(wrapper.text()).toContain('team-1');
      expect(wrapper.text()).toContain('team-2');
      expect(wrapper.text()).toContain('team-3');
      done();
    }, 1000);
  });

  it('adds new interviewers', (done) => {
    expect(wrapper.text()).not.toContain('new-name');
    expect(wrapper.text()).not.toContain('new-team');

    setTimeout(() => {
      setText('newInterviewerName', 'new-name');
      setText('newInterviewerTeam', 'new-team');
      submit('newInterviewer');

      expect(wrapper.text()).toContain('new-name');
      expect(wrapper.text()).toContain('new-team');

      wrapper.unmount();
      wrapper = mount(<App firebase={firebaseApp} />);

      expect(wrapper.text()).toContain('new-name');
      expect(wrapper.text()).toContain('new-team');
      done();
    }, 1000);
  });
});

describe('hosts', () => {
  beforeEach(async () => {
    const hostsRef = firebaseApp.database().ref('hosts');
    hostsRef.push({ name: 'host-1' });
    hostsRef.push({ name: 'host-2' });
    hostsRef.push({ name: 'host-3' });

    wrapper = mount(<App firebase={firebaseApp} />);
    await asyncFlush();
  });

  afterEach(() => {
    wrapper.unmount();
    firebaseApp.database().ref('hosts').remove();
  });

  it('shows hosts', (done) => {
    setTimeout(() => {
      expect(wrapper.text()).toContain('Hosts');

      expect(wrapper.text()).toContain('host-1');
      expect(wrapper.text()).toContain('host-2');
      expect(wrapper.text()).toContain('host-3');
      done();
    }, 1000);
  });

  it('adds new hosts', (done) => {
    expect(wrapper.text()).not.toContain('new-name');

    setTimeout(() => {
      setText('newHostName', 'new-name');
      submit('newHost');

      expect(wrapper.text()).toContain('new-name');

      wrapper.unmount();
      wrapper = mount(<App firebase={firebaseApp} />);

      expect(wrapper.text()).toContain('new-name');
      done();
    }, 1000);
  });
});
