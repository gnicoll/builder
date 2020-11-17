import React from 'react';
import {
    BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Main from './App';

const App = () => {
  return (
    <Router>

    <Switch>
      <Route
        path="/:codestring?"
        component={Main}
      />
    </Switch>
    </Router>
  );
};

export default App;
