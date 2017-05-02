import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './base.scss';

const Header = (({ children }) =>
  <div data-container>
    <div className="header">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </div>
    {children}
  </div>
);

Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
