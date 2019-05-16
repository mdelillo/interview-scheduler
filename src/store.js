import { createStore, combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import highlightValue from './reducers/highlightValue';

export default function configureStore() {
  const rootReducer = combineReducers({ highlightValue, firebase: firebaseReducer });
  const initialState = window.__INITIAL_STATE__;
  const store = createStore(
    rootReducer,
    initialState,
  );

  return store;
}
