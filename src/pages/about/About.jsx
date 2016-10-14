import React, { Component } from 'react';
import { observer } from 'mobx-react';
import AppState from '../../state/AppState';

const windTurbine = require('../../images/windTurbine.svg');

@observer

class App extends Component {

  fetchData = () => {
    this.props.appState.fetchData('api/users');
  }

  render() {
    return (
      <div>
        <div id="header" className="header">
          <img src={windTurbine} alt="wind turbine" />
          <h2>React MobX Template</h2>
          <h4>A simple start in the about fdsa</h4>
        </div>
        <button onClick={this.fetchData}>
          Get User
        </button>
        <p>{`${this.props.appState.user.first_name} ${this.props.appState.user.last_name}`}</p>
        <p>{`${this.props.appState.user.phone}`}</p>
      </div>
    );
  }
}

App.propTypes = {
  appState: React.PropTypes.instanceOf(AppState),
};

export default App;
