import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Router, Route, browserHistory } from 'react-router';
import AppState from './AppState';
import App from './App';
import './base.scss';


const appState = new AppState();

const routes = (
  <Route path="/" component={() => (<App appState={appState} />)} />
);

render((
  <AppContainer>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </AppContainer>
), document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./App', () => {
    render((
      <AppContainer>
        <Router history={browserHistory}>
          {routes}
        </Router>
      </AppContainer>
    ), document.getElementById('root'));
  });
}
