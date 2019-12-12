import React from 'react'
import PropTypes from 'prop-types'
import './Card.css'

function Card(props) {
  const { card, color, showing, handleClick } = props
  let style = {}

  if (showing) {
    style.backgroundColor = color
  }

  return (
    <div className="card" 
      onClick={() => handleClick(card.id)}
      style={style}
    />
  )
}

Card.propTypes = {
  showing: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default Card
