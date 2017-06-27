import React from 'react';
import PropTypes from 'prop-types';
import AppState from '../../state/AppState';

// import modules
import Title from './modules/title/title';
import User from '../../shared_modules/user/user';

// stateless component
const Home = (({ appState }) =>
  <page>
    <Title />
    <p>templat</p>
    <User appState={appState} />
  </page>
);

Home.propTypes = {
  appState: PropTypes.instanceOf(AppState),
};

export default Home;
