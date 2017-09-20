import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AppState from './state/AppState';
import Header from './modules/header/header';

// import pages
import Home from './pages/Home';
import About from './pages/About';

// create global state
const appState = new AppState();

// include scss
import './styles/base.scss';

// define routes
const Routes = (() =>
  <BrowserRouter>
    <div id="app-container">
      <Route path="/" component={Header} />
      <Route exact path="/" component={() => <Home appState={appState} />} />
      <Route path="/about" component={() => <About appState={appState} />} />
    </div>
  </BrowserRouter>
);

export default Routes;
