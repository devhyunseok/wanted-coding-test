import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import ReactModal from 'react-modal';
import { Router } from 'react-router';
import createSagaMiddleware from 'redux-saga';
import combineSagas from './sagas/combineSagas';
import configureStore, { history } from './configureStore'

const sagaMiddleware = createSagaMiddleware();
const store = configureStore(sagaMiddleware)
sagaMiddleware.run(combineSagas);

ReactModal.setAppElement('#root');

const app = (
  <Provider store={store}>
     <ConnectedRouter history={history}>
       <Router history={history}> 
        <App/>
      </Router>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
