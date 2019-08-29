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
// import * as serviceWorker from './serviceWorker';

const sagaMiddleware = createSagaMiddleware();

let store = createStore(combineReducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(combineSagas);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
