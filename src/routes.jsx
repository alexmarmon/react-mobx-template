import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
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

// Splitted class to lazy load modules
class Splitted extends Component {
  componentWillMount = () => {
    this.props.load.then((c) => { this.Comp = c; this.forceUpdate(); });
  };
  render = () => (
    this.Comp ? <this.Comp.default appState={this.props.appState} /> : null
  )
}

// Splitted props
Splitted.propTypes = {
  appState: PropTypes.instanceOf(AppState),
  load: PropTypes.object,
};

export default Routes;
