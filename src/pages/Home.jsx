import React from 'react'
import AppState from 'state/AppState'
import Title from 'modules/title/title'
import User from 'modules/user/user'

const Home = ({ state }) => (
  <div>
    <Title />
    <User state={state} />
  </div>
)

export default Home
