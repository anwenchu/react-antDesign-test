import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import ElementNew from './routes/ElementNew';
import ElementManage from './routes/ElementManage';
import TestCaseManage from './routes/TestCaseManage';
import TestPlane from './routes/TestPlane';
import TestPlaneManage from './routes/TestPlaneManage';
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
        <Route path="/ElementManage" exact component={ElementManage} />
        <Route path="/ElementNew" exact component={ElementNew} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
