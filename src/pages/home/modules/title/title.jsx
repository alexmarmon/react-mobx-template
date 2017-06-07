import React from 'react';

// scss
import './title.scss';

// Stateless component
const Title = (() =>
  <div className="title-module">
    <img src="/static/windTurbine.svg" alt="wind turbine" />
    <h2>React MobX Template</h2>
    <h4>A simple start.</h4>
    <h4>Home Page</h4>
  </div>
);

export default Title;
