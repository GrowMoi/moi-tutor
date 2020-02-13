import React from "react";

import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Types
import * as routeTypes from "./config/routeTypes";

import LoginPage from './containers/LoginPage'

import PrivateRoute from './containers/PrivateRoute';
import AppPage from './containers/AppPage';

function App() {
  return (
    <Router>
      <main className="App">
        <Switch>
          <Route path={routeTypes.AUTH_LOGIN} component={LoginPage} />
          <PrivateRoute path="/" component={AppPage} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
