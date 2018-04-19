import React from 'react';
import { shallow } from 'enzyme';
import AuthenticatedApp from './AuthenticatedApp';
import AppBody from './AppBody';

function render(admins, email, everyoneCanWrite) {
  return shallow(<AuthenticatedApp
    admins={admins}
    user={{ email, photoURL: '', displayName: '' }}
    everyoneCanWrite={everyoneCanWrite}
    loginFunc={() => {}}
    logoutFunc={() => {}}
  />);
}

describe('AuthenticatedApp', () => {
  const admins = ['admin-1@pivotal.io', 'admin-2@pivotal.io', 'admin-3@pivotal.io'];

  describe('when the user is an admin', () => {
    it('does not make the body readonly', () => {
      const wrapper = render(admins, 'admin-2@pivotal.io');
      expect(wrapper.find(AppBody).props().readonly).toBe(false);
    });
  });

  describe('when the user is not an admin', () => {
    describe('when everyoneCanWrite is true', () => {
      it('does not make the body readonly', () => {
        const wrapper = render(admins, 'non-admin@pivotal.io', true);
        expect(wrapper.find(AppBody).props().readonly).toBe(false);
      });
    });

    describe('when everyoneCanWrite is false', () => {
      it('makes the body readonly', () => {
        const wrapper = render(admins, 'non-admin@pivotal.io', false);
        expect(wrapper.find(AppBody).props().readonly).toBe(true);
      });
    });

    describe('when everyoneCanWrite is not specified', () => {
      it('makes the body readonly', () => {
        const wrapper = render(admins, 'non-admin@pivotal.io');
        expect(wrapper.find(AppBody).props().readonly).toBe(true);
      });
    });
  });
});
