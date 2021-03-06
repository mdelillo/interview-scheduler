import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import firebase from 'firebase';
import moment from 'moment';
import AppBody from './AppBody';
import configureStore from '../store';

let firebaseApp;
let wrapper;
let store;

const asyncFlush = () => new Promise(resolve => setTimeout(resolve, 0));

function setText(name, value) {
  const element = wrapper.find(`[name="${name}"]`);
  element.instance().value = value;
  element.simulate('change');
}

function setDate(value) {
  wrapper.find('DatePicker').instance().props.onChange(moment(value));
}

function submit(name) {
  wrapper.find(`[name="${name}"]`).simulate('submit');
}

function mountApp(readonly = false) {
  wrapper = mount(<Provider store={store}><AppBody loggedIn loginFunc={() => {}} readonly={readonly} /></Provider>);
}

function unmountApp() {
  if (wrapper) {
    wrapper.unmount();
  }
}

beforeAll(() => {
  const config = {
    apiKey: process.env.FIREBASE_TEST_API_KEY,
    authDomain: process.env.FIREBASE_TEST_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_TEST_DATABASE_URL,
    projectId: process.env.FIREBASE_TEST_PROJECT_ID,
    storageBucket: process.env.FIREBASE_TEST_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_TEST_MESSAGING_SENDER_ID,
  };
  store = configureStore(config);
  firebaseApp = firebase.initializeApp(config, `test-${new Date().getTime()}`);
});

afterAll(() => {
  firebaseApp.database().goOffline();
});

describe('AppBody', () => {
  beforeEach(async () => {
    const interviewersRef = firebaseApp.database().ref('interviewers');
    const hostsRef = firebaseApp.database().ref('hosts');
    const interviewsRef = firebaseApp.database().ref('interviews');
    const notesRef = firebaseApp.database().ref('notes');
    interviewersRef.push({ name: 'person1', team: 'team1' });
    interviewersRef.push({ name: 'person2', team: 'team2' });
    interviewersRef.push({ name: 'person3', team: 'team3' });
    hostsRef.push({ name: 'person2' });
    hostsRef.push({ name: 'person3' });
    hostsRef.push({ name: 'person4' });
    interviewsRef.push({
      date: '2018-01-01', morningPair: '', morningTeam: '', afternoonPair: '', afternoonTeam: '', host: '',
    });
    interviewsRef.push({
      date: '2018-01-02', morningPair: 'person1', morningTeam: 'team0', afternoonPair: 'person2', afternoonTeam: 'team2', host: 'person3',
    });
    interviewsRef.push({
      date: '2018-01-03', morningPair: 'person2', morningTeam: 'team2', afternoonPair: 'person1', afternoonTeam: 'team1', host: 'person4',
    });
    interviewsRef.push({
      date: '2018-01-04', morningPair: 'person1', morningTeam: 'team1', afternoonPair: 'person3', afternoonTeam: 'team3', host: 'person2',
    });
    notesRef.set('some-notes');
    mountApp();
    await asyncFlush();
  });

  afterEach(() => {
    firebaseApp.database().ref().remove();
    unmountApp();
  });

  it('shows existing interviews, interviewers, and hosts', (done) => {
    setTimeout(() => {
      wrapper.update();

      const interviews = wrapper.find('Interviews');
      expect(interviews.text()).toContain('Date');
      expect(interviews.text()).toContain('Morning');
      expect(interviews.text()).toContain('Afternoon');
      expect(interviews.text()).toContain('Host');
      expect(interviews.text()).toContain('2018-01-02');
      expect(interviews.text()).toContain('person1');
      expect(interviews.text()).toContain('team0');
      expect(interviews.text()).toContain('person2');
      expect(interviews.text()).toContain('team2');
      expect(interviews.text()).toContain('person3');

      const interviewers = wrapper.find('Interviewers');
      expect(interviewers.text()).toContain('Interviewers');
      expect(interviewers.text()).toContain('person1');
      expect(interviewers.text()).toContain('person2');
      expect(interviewers.text()).toContain('person3');
      expect(interviewers.text()).toContain('team1');
      expect(interviewers.text()).toContain('team2');
      expect(interviewers.text()).toContain('team3');
      expect(interviewers.text()).not.toContain('person4');
      expect(interviewers.text()).not.toContain('team0');

      const hosts = wrapper.find('Hosts');
      expect(hosts.text()).toContain('Hosts');
      expect(hosts.text()).toContain('person2');
      expect(hosts.text()).toContain('person3');
      expect(hosts.text()).toContain('person4');
      expect(hosts.text()).not.toContain('person1');
      done();
    }, 500);
  });

  it('highlights all instances of a name or team when hovered over', (done) => {
    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find('td.highlight')).toHaveLength(0);

      const person2InHosts = wrapper.find('Hosts').find('td').filterWhere(td => td.text() === 'person2');
      person2InHosts.simulate('mouseenter');
      expect(wrapper.find('td.highlight').everyWhere(td => td.text() === 'person2')).toBe(true);
      expect(wrapper.find('Interviews').find('td.highlight')).toHaveLength(3);
      expect(wrapper.find('Interviewers').find('td.highlight')).toHaveLength(1);
      expect(wrapper.find('Hosts').find('td.highlight')).toHaveLength(1);

      person2InHosts.simulate('mouseleave');
      expect(wrapper.find('td.highlight')).toHaveLength(0);

      const team1InInterviewers = wrapper.find('Interviewers').find('td').filterWhere(td => td.text() === 'team1');
      team1InInterviewers.simulate('mouseenter');
      expect(wrapper.find('td.highlight').everyWhere(td => td.text() === 'team1')).toBe(true);
      expect(wrapper.find('Interviews').find('td.highlight')).toHaveLength(2);
      expect(wrapper.find('Interviewers').find('td.highlight')).toHaveLength(1);
      expect(wrapper.find('Hosts').find('td.highlight')).toHaveLength(0);
      done();
    }, 500);
  });

  describe('when the user is an admin', () => {
    it('adds and deletes interviews, interviewers, and hosts', (done) => {
      setTimeout(() => {
        wrapper.update();

        setDate('2018-01-10');
        setText('newInterviewMorningPair', 'new-interview-morning-pair');
        setText('newInterviewMorningTeam', 'new-interview-morning-team');
        setText('newInterviewAfternoonPair', 'new-interview-afternoon-pair');
        setText('newInterviewAfternoonTeam', 'new-interview-afternoon-team');
        setText('newInterviewHost', 'new-interview-host');
        submit('newInterview');
        expect(wrapper.text()).toContain('2018-01-10');
        expect(wrapper.text()).toContain('new-interview-morning-pair');
        expect(wrapper.text()).toContain('new-interview-morning-team');
        expect(wrapper.text()).toContain('new-interview-afternoon-pair');
        expect(wrapper.text()).toContain('new-interview-afternoon-team');
        expect(wrapper.text()).toContain('new-interview-host');

        setText('newInterviewerName', 'new-interviewer-name');
        setText('newInterviewerTeam', 'new-interviewer-team');
        submit('newInterviewer');
        expect(wrapper.text()).toContain('new-interviewer-name');
        expect(wrapper.text()).toContain('new-interviewer-team');

        setText('newHostName', 'new-host-name');
        submit('newHost');
        expect(wrapper.text()).toContain('new-host-name');

        unmountApp();
        mountApp();

        expect(wrapper.text()).toContain('2018-01-10');
        expect(wrapper.text()).toContain('new-interview-morning-pair');
        expect(wrapper.text()).toContain('new-interview-morning-team');
        expect(wrapper.text()).toContain('new-interview-afternoon-pair');
        expect(wrapper.text()).toContain('new-interview-afternoon-team');
        expect(wrapper.text()).toContain('new-interview-host');
        expect(wrapper.text()).toContain('new-interviewer-name');
        expect(wrapper.text()).toContain('new-interviewer-team');
        expect(wrapper.text()).toContain('new-host-name');

        wrapper.find('Interview').find('MdDelete').first().simulate('click');
        wrapper.find('Interviewer').find('MdDelete').first().simulate('click');
        wrapper.find('Host').find('MdDelete').first().simulate('click');

        setTimeout(() => {
          wrapper.update();
          const interviews = wrapper.find('Interviews');
          expect(interviews.find('tr')).toHaveLength(5);
          expect(interviews.text()).not.toContain('2018-01-10');
          expect(interviews.text()).toContain('2018-01-04');
          expect(interviews.text()).toContain('2018-01-03');
          expect(interviews.text()).toContain('2018-01-02');
          expect(interviews.text()).toContain('2018-01-01');

          const interviewers = wrapper.find('Interviewers');
          expect(interviewers.find('tr')).toHaveLength(3);
          expect(interviewers.text()).not.toContain('new-interviewer-name');
          expect(interviewers.text()).toContain('person1');
          expect(interviewers.text()).toContain('person2');
          expect(interviewers.text()).toContain('person3');

          const hosts = wrapper.find('Hosts');
          expect(hosts.find('tr')).toHaveLength(3);
          expect(interviewers.text()).not.toContain('new-host-name');
          expect(hosts.text()).toContain('person2');
          expect(hosts.text()).toContain('person3');
          expect(hosts.text()).toContain('person4');

          unmountApp();
          mountApp();

          expect(wrapper.text()).not.toContain('2018-01-10');
          expect(wrapper.text()).not.toContain('new-interviewer-name');
          expect(wrapper.text()).not.toContain('new-host-name');

          done();
        }, 100);
      }, 500);
    });

    it('saves arbitrary notes', (done) => {
      setTimeout(() => {
        wrapper.update();
        expect(wrapper.text()).toContain('some-notes');

        setText('notes', 'some-updated-notes');
        expect(wrapper.text()).toContain('some-updated-notes');

        unmountApp();
        mountApp();

        expect(wrapper.text()).toContain('some-updated-notes');

        done();
      }, 500);
    });
  });

  describe('when the user is not an admin', () => {
    beforeEach(() => {
      unmountApp();
      mountApp(true);
    });

    it('does not allow interviews, interviewers, or hosts to be added or deleted', (done) => {
      setTimeout(() => {
        expect(wrapper.find('form')).toHaveLength(0);
        expect(wrapper.find('MdDelete')).toHaveLength(0);

        done();
      }, 500);
    });

    it('shows notes as readonly', (done) => {
      setTimeout(() => {
        expect(wrapper.text()).toContain('some-notes');
        expect(wrapper.find('textarea').props().readOnly).toBe(true);

        done();
      }, 500);
    });
  });
});
