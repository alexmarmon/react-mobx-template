import React from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import AppState from './state/AppState';
import Header from './header';
import Main from './pages/main/Main';
import About from './pages/about/About';

const appState = new AppState();

const NoMatch = (() =>
  <div>
    <h2>Whoops</h2>
    <p>Sorry but you are lost!</p>
  </div>
);

const App = (() =>
  <BrowserRouter>
    <div>
      <Match pattern="/" appState={appState} component={Header} />
      <Match exactly pattern="/" component={() => (<Main appState={appState} />)} />
      <Match pattern="/about" component={() => (<About appState={appState} />)} />
      {/* If none of those match, then a sibling `Miss` will render. Except it doesnt work right now. */}
      <Miss component={NoMatch} />
    </div>
  </BrowserRouter>
);

export default App;
