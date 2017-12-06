import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import TestCase from './routes/TestCase';
import IndexPage from './routes/IndexPage';



function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/TestCase" exact component={TestCase} />
        <Route path="/IndexPage" exact component={IndexPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
