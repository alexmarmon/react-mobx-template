import React from 'react';
import { Link } from 'react-router';
import './base.scss';

const Header = (({ children }) =>
  <div data-container>
    <div>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </div>
    {children}
  </div>
);

Header.propTypes = {
  children: React.PropTypes.node,
};

export default Header;
