import React from 'react'
// scss
import './text.scss'

// Stateless component
const Text = ({ copy }) => (
  <p className="text-module">
    {copy}
  </p>
)

export default Text
