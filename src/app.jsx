import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AppState from './state/AppState';
import Header from './header';
import Main from './pages/main/Main';
import About from './pages/about/About';

const appState = new AppState();

const App = (() =>
  <BrowserRouter>
    <div>
      <Route path="/" appState={appState} component={Header} />
      <Route exact path="/" component={() => (<Main appState={appState} />)} />
      <Route path="/about" component={() => (<About appState={appState} />)} />
    </div>
  </BrowserRouter>
);

export default App;
