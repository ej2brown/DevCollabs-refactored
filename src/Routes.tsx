import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, CodeEditor } from './containers';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/CodeEditor" component={CodeEditor} />
  </Switch>
);

export default Routes;
