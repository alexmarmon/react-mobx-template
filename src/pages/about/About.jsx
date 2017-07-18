import React from 'react';
import PropTypes from 'prop-types';
import AppState from '../../state/AppState';

// import modules
import Text from './modules/text/text';
import User from '../../shared_modules/user/user';

// stateless component
const About = (({ appState }) =>
  <div>
    <h3>About Page</h3>
    <Text copy="Notice that the selected user persists when api calls are working" />
    <User appState={appState} />
  </div>
);

About.propTypes = {
  appState: PropTypes.instanceOf(AppState),
};

export default About;
