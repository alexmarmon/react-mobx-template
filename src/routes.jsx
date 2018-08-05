import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './modules/header/header'

// include scss
import './styles/base.scss'

// import pages
import Home from './pages/Home'
import About from './pages/About'

// define routes
const Routes = () => (
  <BrowserRouter>
    <div id="app-container">
      <Route path="/" component={Header} />
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </div>
  </BrowserRouter>
)

export default Routes
