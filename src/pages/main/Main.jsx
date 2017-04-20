import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import AppState from '../../state/AppState';

@observer

class App extends Component {

  fetchData = () => {
    this.props.appState.fetchData('api/users');
  }

  render = () => {
    const app = this.props.appState;
    return (
      <div>
        <div id="main" className="main">
          <img src="/static/windTurbine.svg" alt="wind turbine" />
          <h2>React MobX Template</h2>
          <h4>A simple start.</h4>
          <h4>Main Page</h4>
        </div>
        <div>
          <button onClick={this.fetchData}>
            Get User
          </button>
          <p>{`${app.fullName}`}</p>
          <p>{`${app.user.phone}`}</p>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  appState: PropTypes.instanceOf(AppState),
};

export default App;
