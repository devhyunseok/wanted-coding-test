import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import combineSagas from './sagas/combineSagas';
import { BrowserRouter } from 'react-router-dom';
import combineReducers from './modules/combineReducers';
import ReactModal from 'react-modal';
// import * as serviceWorker from './serviceWorker';
import { createLogger } from 'redux-logger';

const logger = createLogger();


ReactModal.setAppElement('#root');

const sagaMiddleware = createSagaMiddleware();
const middleware = [ sagaMiddleware, logger ];
let store = createStore(combineReducers, applyMiddleware(...middleware));

sagaMiddleware.run(combineSagas);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
