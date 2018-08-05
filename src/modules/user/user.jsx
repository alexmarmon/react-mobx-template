import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import state from '../../state/AppState'
import './user.scss'

@observer class User extends Component { // https://mobx.js.org/refguide/observer-component.html
  @observable ticker = 0

  componentDidMount() {
    setInterval(() => this.ticker += 1, 1000)
  }

  fetch = () => state.fetchData('api/users')

  render = () => (
    <div className="user-module">
      <button onClick={this.fetch}>
        Get User
      </button>
      <p>{`${state.fullName}`}</p>
      <p>{`${state.user.phone}`}</p>
      <p>{`${this.ticker}`}</p>
    </div>
  )
}

export default User
