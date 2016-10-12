import React, { Component } from 'react';
import { observer } from 'mobx-react';
import AppState from './AppState';

@observer

class App extends Component {

  fetchData = () => {
    this.props.appState.fetchData();
  }

  render() {
    return (
      <div>
        <button onClick={this.fetchData}>
          Get Data
        </button>
        <p>{this.props.appState.data.id}</p>
      </div>
    );
  }
}

App.propTypes = {
  appState: React.PropTypes.instanceOf(AppState),
};

export default App;
