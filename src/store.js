import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import firebase from 'firebase';
import highlightValue from './reducers/highlightValue';

export default function configureStore(firebaseConfig) {
  firebase.initializeApp(firebaseConfig);

  const rootReducer = combineReducers({ highlightValue, firebase: firebaseReducer });
  const initialState = window.__INITIAL_STATE__;
  const rrfConfig = { userProfile: 'users' };
  const store = createStore(
    rootReducer,
    initialState,
    compose(reactReduxFirebase(firebase, rrfConfig)),
  );

  return store;
}
