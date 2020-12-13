import React from 'react';
import {
    HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Builder from './Builder';
import Viewer from './Viewer';

const App = () => {
  return (
    <Router>

    <Switch>
      <Route
        path="/builder/:codestring?"
        component={Builder}
      />
      <Route
        path="/view/:codestring?"
        component={Viewer}
      />
    </Switch>
    </Router>
  );
};

export default App;
