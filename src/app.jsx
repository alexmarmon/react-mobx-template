import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AppState from './state/AppState';
import Header from './shared_modules/header/header';
import Home from './pages/home/Home';
import About from './pages/about/About';

// include scss
import './shared_styles/base.scss';

// create global state
const appState = new AppState();

// define routes
const App = (() =>
  <BrowserRouter>
    <app>
      <Route path="/" appState={appState} component={Header} />
      <Route exact path="/" component={() => (<Home appState={appState} />)} />
      <Route path="/about" component={() => (<About appState={appState} />)} />
    </app>
  </BrowserRouter>
);

export default App;
