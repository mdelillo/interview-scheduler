import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from './firebase';

ReactDOM.render(<App firebase={firebase} />, document.getElementById('root'));
registerServiceWorker();
