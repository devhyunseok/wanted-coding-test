import React, {Fragment, useEffect } from 'react';
import GlobalStyle from "./GlobalStyles";
import { fetchJobFilters} from 'sagas/jobSagaModules';
import { useDispatch } from "react-redux";
import { Route, Switch } from 'react-router';
import JobsContainer from 'containers/jobsContainers';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobFilters());
  });

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
