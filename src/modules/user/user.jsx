import React, { Component } from 'react'
import { observer } from 'mobx-react'

// scss
import './user.scss'

@observer // https://mobx.js.org/refguide/observer-component.html

export default class User extends Component {
  fetchData = () => {
    this.props.state.fetchData('api/users')
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
