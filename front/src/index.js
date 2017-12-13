import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Router from './Router'
import registerServiceWorker from './registerServiceWorker';
import createHistory from 'history/createBrowserHistory'
const history = createHistory()
ReactDOM.render(<Router history={history}/>, document.getElementById('root'));
registerServiceWorker();
