import React from 'react'
import Card from '../Card/Card'
import './CardContainer.css'

function CardContainer(props) {
  const { cards, cardState, handleClick } = props

  const cardComponents = cards.map(card => (
    <Card 
      key={card.id}
      showing={card.cardState !== cardState.HIDING}
      color={card.color} 
      card={card}
      handleClick={handleClick}
    />
  ))

  return (
    <div className="card-container">
      {cardComponents}
    </div>
  )
}

export default CardContainer
