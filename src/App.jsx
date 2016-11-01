import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import AppState from './state/AppState';
import Header from './header';
import Main from './pages/main/Main';
import About from './pages/about/About';
// const windTurbine = require('./images/windTurbine.svg');

const appState = new AppState();

const routes = (
  <Route path="/" appState={appState} component={Header}>
    <IndexRoute component={() => (<Main appState={appState} />)} />
    <Route path="/about" component={() => (<About appState={appState} />)} />
  </Route>
);

// Current hackary:
// key={new Date()} (I think) stops
// the Router from being re-rendered
// on every hot update
const App = (() =>
  <Router key={new Date()} history={browserHistory} routes={routes} />
);

export default App;
