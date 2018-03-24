import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import AppState from './state/AppState'
import Header from './modules/header/header'

// include scss
import './styles/base.scss'

// import pages
import Home from './pages/Home'
import About from './pages/About'

// create global state
const appState = new AppState()

// define routes
const Routes = () => (
  <BrowserRouter>
    <div id="app-container">
      <Route path="/" component={Header} />
      <Route exact path="/" component={() => <Home state={appState} />} />
      <Route path="/about" component={() => <About state={appState} />} />
    </div>
  </BrowserRouter>
)

export default Routes
