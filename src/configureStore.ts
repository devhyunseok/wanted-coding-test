import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import combineReducers from './modules/combineReducers';
import { createLogger } from 'redux-logger';

const logger = createLogger();
export const history = createBrowserHistory();

export default function configureStore(sagaMiddleware: any) {
  const store = createStore(
    combineReducers(history), // root reducer with router state
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        sagaMiddleware,
        logger
        // ... other middlewares ...
      ),
    ),
  )
  return store
}

