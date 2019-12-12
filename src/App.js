import React, { Component } from 'react';
import NavHeader from './components/NavHeader/NavHeader'
import CardContainer from './components/CardContainer/CardContainer'
import './App.css';

const CardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHING: 2
}

class App extends Component {
  constructor(props) {
    super(props)

    let cards = [
      {id: 0, cardState: 0, color: "Darkorange"},
      {id: 1, cardState: 0, color: "LavenderBlush"},
      {id: 2, cardState: 0, color: "LawnGreen"},
      {id: 3, cardState: 0, color: "SlateGray"},
      {id: 4, cardState: 0, color: "DarkGreen"},
      {id: 5, cardState: 0, color: "Red"},
      {id: 6, cardState: 0, color: "DarkViolet"},
      {id: 7, cardState: 0, color: "Orchid"},
      {id: 8, cardState: 0, color: "Darkorange"},
      {id: 9, cardState: 0, color: "LavenderBlush"},
      {id: 10, cardState: 0, color: "LawnGreen"},
      {id: 11, cardState: 0, color: "SlateGray"},
      {id: 12, cardState: 0, color: "DarkGreen"},
      {id: 13, cardState: 0, color: "Red"},
      {id: 14, cardState: 0, color: "DarkViolet"},
      {id: 15, cardState: 0, color: "Orchid"}
    ]

    cards = this.randomiseColors(cards)

    this.state = { cards, noClick: false }

    this.handleClick = this.handleClick.bind(this)
    this.handleNewGame = this.handleNewGame.bind(this)
  }

  handleNewGame() {
    let cards = this.state.cards.map(c => ({
      ...c,
      cardState: CardState.HIDING
    }))
    
    cards = this.randomiseColors(cards)

    this.setState({ cards })
  }

  mapCardState(cards, idsToChange, newCardState) {
    return cards.map(c => {
      if (idsToChange.includes(c.id)) {
        return {
          ...c,
          cardState: newCardState
        }
      }
      return c
    })
  }

  handleClick(id) {
    // the clicked card
    const foundCard = this.state.cards.find(c => c.id === id)
    
    // to prevent clicking on more than two cards
    if (this.state.noClick) {
      return
    }

    // updating state of selected card and returning back all cards
    let cards = this.mapCardState(this.state.cards, [id], CardState.SHOWING)

    const showingCards = cards.filter(c => c.cardState === CardState.SHOWING)

    // user clicked on an already showing card, so hide it
    if (showingCards.length === 1 && foundCard.cardState === CardState.SHOWING) {
      cards = this.mapCardState(cards, [id], CardState.HIDING)
      this.setState({ cards })
      return
    }

    const ids = showingCards.map(c => c.id)

    if (showingCards.length === 2 && showingCards[0].color === showingCards[1].color) { // two cards clicked matched
      cards = this.mapCardState(cards, ids, CardState.MATCHING)
    } else if (showingCards.length === 2) { // two cards clicked did not match
      let hidingCards = this.mapCardState(cards, ids, CardState.HIDING)

      this.setState({ cards: cards, noClick: true }, () => {
        setTimeout(() => {
          // set the state of the cards to HIDING after 1.3 seconds
          this.setState({ cards: hidingCards, noClick: false })
        }, 1300)
      })
      return
    }
    this.setState({ cards })
  }

  randomiseColors(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
      const randomIdx = Math.floor(Math.random() * cards.length)
      let currentColor = cards[i]
      cards[i] = cards[randomIdx]
      cards[randomIdx] = currentColor
    }
    return cards
  }

  render() {
    return (
      <div className="App">
        <NavHeader onNewGame={this.handleNewGame} />
        <CardContainer
          cards={this.state.cards}
          cardState={CardState}
          handleClick={this.handleClick} />
      </div>
    )
  }
}

export default App;
