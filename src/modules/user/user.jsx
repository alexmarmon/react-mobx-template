import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import AppState from 'state/AppState';

// scss
import './user.scss';

@observer // https://mobx.js.org/refguide/observer-component.html

class User extends Component {
  fetchData = () => {
    this.props.state.fetchData('api/users');
  }

  render = () => (
    <div className="user-module">
      <button onClick={this.fetchData}>
        Get User
      </button>
      <p>{`${this.props.state.fullName}`}</p>
      <p>{`${this.props.state.user.phone}`}</p>
    </div>
  )
}

User.propTypes = {
  state: PropTypes.instanceOf(AppState),
};

export default User;
