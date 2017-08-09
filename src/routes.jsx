import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Splitted } from '@lofty/lofty-splitted';
import AppState from './state/AppState';
import Header from './shared_modules/header/header';

// create global state
const appState = new AppState();

// include scss
import './shared_styles/base.scss';

// define routes
const Routes = (() =>
  <BrowserRouter>
    <div id="app-container">
      <Route path="/" appState={appState} component={Header} />
      <Route exact path="/" component={() => <Splitted load={import('./pages/home/Home')} appState={appState} />} />
      <Route path="/about" component={() => <Splitted load={import('./pages/about/About')} appState={appState} />} />
    </div>
  </BrowserRouter>
);

export default Routes;
