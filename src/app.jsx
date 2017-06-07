import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AppState from './state/AppState';
import Header from './shared_modules/header/header';
import Home from './pages/home/Home';
import About from './pages/about/About';

// Include SCSS
import './shared_styles/base.scss';

const appState = new AppState();

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
