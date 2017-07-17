import React from 'react';
import PropTypes from 'prop-types';
import AppState from '../../state/AppState';
import { Component1 } from 'lofty-npm-template';
// import modules
import Title from './modules/title/title';
import User from '../../shared_modules/user/user';

// stateless component
const Home = (({ appState }) =>
  <page>
    <Title />
    <Component1 />
    <User appState={appState} />
  </page>
);

Home.propTypes = {
  appState: PropTypes.instanceOf(AppState),
};

export default Home;
