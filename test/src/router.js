import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import TestPlane from './routes/TestPlane';
import TestPlaneManage from './routes/TestPlaneManage';
import TestCaseManage from './routes/TestCaseManage';
import TestCase from './routes/TestCase';
import IndexPage from './routes/IndexPage';




function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/TestCase" exact component={TestCase} />
        <Route path="/IndexPage" exact component={IndexPage} />
        <Route path="/TestCaseManage" exact component={TestCaseManage} />
        <Route path="/TestPlaneManage" exact component={TestPlaneManage} />
        <Route path="/TestPlane" exact component={TestPlane} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
