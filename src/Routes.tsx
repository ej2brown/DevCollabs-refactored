import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Group, CodeRoom } from './containers';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/Group" component={Group} />
    <Route path="/CodeRoom" component={CodeRoom} />
  </Switch>
);

export default Routes;
