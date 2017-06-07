import React from 'react';
import PropTypes from 'prop-types';


// scss
import './text.scss';

// Stateless component
const Text = (({ copy }) =>
  <p className="text-module">
    {copy}
  </p>
);

Text.propTypes = {
  copy: PropTypes.string,
};

export default Text;
