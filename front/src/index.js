import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Router from './Router'
import registerServiceWorker from './registerServiceWorker';
import createHistory from 'history/createBrowserHistory'
import {promiseAjax} from './page/common/an';


const history = createHistory()


promiseAjax.init({
    setOptions: (instance) => {
        instance.defaults.baseURL = 'http://localhost:8080/';
    },
    // onShowErrorTip: (err, errorTip) => {
    //     if (err.response && err.response.status === 401) {
    //         // return toLogin();
    //     }
    //     if (errorTip !== false) {
    //         handleErrorMessage(err);
    //     }
    // },
    // onShowSuccessTip: (response, successTip) => {
    //     if (successTip !== false) {
    //         message.success(successTip, 3);
    //     }
    // },
});

ReactDOM.render(<Router history={history}/>, document.getElementById('root'));
registerServiceWorker();
