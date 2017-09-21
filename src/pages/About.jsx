import React from 'react';
import PropTypes from 'prop-types';
import AppState from 'state/AppState';

// import modules
import Text from 'modules/text/text';
import User from 'modules/user/user';

// stateless component
const About = (({ state }) =>
  <div>
    <h3>About Page</h3>
    <Text copy="Notice that the selected user persists when api calls are working" />
    <User state={state} />
  </div>
);

About.propTypes = {
  state: PropTypes.instanceOf(AppState),
};

export default About;
