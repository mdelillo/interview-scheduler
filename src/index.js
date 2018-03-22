import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import reducers from './reducers';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from './firebase';

const store = createStore(reducers);

render(
  <Provider store={store}>
    <App firebase={firebase} />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
