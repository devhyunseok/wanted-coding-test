import React, {Fragment, useEffect, useState} from 'react';
import GlobalStyle from "./GlobalStyles";
import { fetchJobFilters, GET_JOB_FILTERS_ASYNC} from 'sagas/jobSagaModules';
import { useDispatch } from "react-redux";
import { Route, Router, Switch } from 'react-router';
import JobsContainer from 'containers/jobsContainers';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: GET_JOB_FILTERS_ASYNC});
  }, []);

  return (
    <Fragment>
      <GlobalStyle/>
      <Switch>
        <Route exact path="/" render={() => (<JobsContainer/>)} />
      </Switch>
    </Fragment>
  );
};

export default App;
