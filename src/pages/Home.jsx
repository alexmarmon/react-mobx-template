import React from 'react';
import PropTypes from 'prop-types';
import AppState from 'state/AppState';
// import modules
import Title from 'modules/title/title';
import User from 'modules/user/user';

// stateless component
const Home = (({ appState }) =>
  <div>
    <Title />
    <User appState={appState} />
  </div>
);

Home.propTypes = {
  appState: PropTypes.instanceOf(AppState),
};

export default Home;
