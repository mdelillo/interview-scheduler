import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import configureStore from './store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};
const store = configureStore(firebaseConfig);
const everyoneCanWrite = !!process.env.REACT_APP_FIREBASE_EVERYONE_CAN_WRITE;
const title = process.env.REACT_APP_TITLE || 'Interview Scheduler';
document.title = title;

render(
  <Provider store={store}>
    <App everyoneCanWrite={everyoneCanWrite} title={title} />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
