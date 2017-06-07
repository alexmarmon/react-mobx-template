import React from 'react';
import PropTypes from 'prop-types';
import AppState from '../../state/AppState';

// import modules
import Text from './modules/text/text';
import User from '../../shared_modules/user/user';

// stateless component
const About = (({ appState }) =>
  <page>
    <h4>About Page</h4>
    <Text copy="Notice that the selected user persists when api calls are working" />
    <User appState={appState} />
  </page>
);

About.propTypes = {
  appState: PropTypes.instanceOf(AppState),
};

export default About;
