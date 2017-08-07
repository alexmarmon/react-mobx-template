import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import AppState from '../../state/AppState';

// scss
import './user.scss';

@observer

class User extends Component {
  fetchData = () => {
    this.props.appState.fetchData('api/users');
    // console.log('api call here');
  }

  render = () => {
    const app = this.props.appState;
    return (
      <div className="user-module">
        <button onClick={this.fetchData}>
          Get User
        </button>
        <p>{`${app.fullName}`}</p>
        <p>{`${app.user.phone}`}</p>
      </div>
    );
  }
}

User.propTypes = {
  appState: PropTypes.instanceOf(AppState),
};

export default User;
