import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import minesweeperApp from './reducers';
import minesweeperMiddleware from './middleware';

let store = createStore(minesweeperApp, applyMiddleware(minesweeperMiddleware));

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root')
);
registerServiceWorker();
