import React from 'react'
import PropTypes from 'prop-types'
import './NavHeader.css'

function NavHeader({onNewGame}) {
  return (
    <div className="nav">
      <h1>Memory Game</h1>
      <h2><a onClick={onNewGame}>New Game</a></h2>
    </div>
  )
}

NavHeader.propTypes = {
  onNewGame: PropTypes.func.isRequired
}

export default NavHeader
