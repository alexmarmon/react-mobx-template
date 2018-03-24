import React from 'react'
import Text from 'modules/text/text'
import User from 'modules/user/user'

// stateless component
const About = ({ state }) => (
  <div>
    <h3>About Page</h3>
    <Text copy="Notice that the selected user persists when api calls are working" />
    <User state={state} />
  </div>
)

export default About
