import React from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import state from '../../state/AppState'

// scss
import './header.scss'

// stateless component
const Header = observer(() => (
  <header>
    <div className="header-module">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <p>Current User: {`${state.user.first_name}`}</p>
    </div>
  </header>
))

export default Header
