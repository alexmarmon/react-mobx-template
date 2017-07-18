import React from 'react';
import PropTypes from 'prop-types';
import AppState from '../../state/AppState';
import { Component1 } from 'lofty-npm-template';
// import modules
import Title from './modules/title/title';
import User from '../../shared_modules/user/user';

// stateless component
const Home = (({ appState }) =>
  <div>
    <Title />
    <Component1 />
    <User appState={appState} />
  </div>
);

Home.propTypes = {
  appState: PropTypes.instanceOf(AppState),
};

export default Home;
