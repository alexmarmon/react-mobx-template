import React from 'react'
import { Link } from 'react-router-dom'

// scss
import './header.scss'

// stateless component
const Header = () => (
  <header>
    <div className="header-module">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </div>
  </header>
)

export default Header
