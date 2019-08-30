import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

import {applyMiddleware, createStore} from "redux";
import createSagaMiddleware from 'redux-saga';
import combineSagas from "./sagas/combineSagas";
import combineReducers from "./modules/combineReducers";
import ReactModal from 'react-modal';

const sagaMiddleware = createSagaMiddleware();

let store = createStore(combineReducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(combineSagas);


it('renders without crashing', () => {
  ReactModal.setAppElement(document.createElement('div'));

  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
