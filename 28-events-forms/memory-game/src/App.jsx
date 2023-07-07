import { useState, useEffect } from 'react';
import { CARD_COLORS } from './assets/settings';
import Navbar from './Navbar';
import Game from './Game';

// TODO: add randomness to colorValue assignment
function createCards(quantity = 16, numColors = CARD_COLORS.length) {
  const result = [];

  for (let i = 0; i < quantity; ++i) {
    result.push({
      id: i,
      colorValue: i % numColors,
      isVisible: false,
      isMatched: false
    });
  }

  return result;
}

function App() {
  const [cards, setCards] = useState(createCards());
  const [exposedCards, setExposedCards] = useState([]);

  useEffect(() => {
    if (exposedCards.length == 2) {
      const cardsCopy = [...cards];
      if (exposedCards[0].colorValue == exposedCards[1].colorValue) {
        console.log('match');
        cardsCopy[exposedCards[0].id].isMatched = true;
        cardsCopy[exposedCards[1].id].isMatched = true;
        setCards(cardsCopy);
      } else {
        console.log('not a match');
        cardsCopy[exposedCards[0].id].isVisible = false;
        cardsCopy[exposedCards[1].id].isVisible = false;
        setCards(cardsCopy);
      }
      setExposedCards([]);
    }
  }, [exposedCards]);

  function resetGame() {
    setCards(createCards());
  }

  function handleCardClick(id) {
    if (exposedCards.length < 2) {
      setExposedCards([...exposedCards, cards[id]]);
      const cardsCopy = [...cards];
      cardsCopy[id].isVisible = true;
      setCards(cardsCopy);
    }
  }

  return (
    <>
      <Navbar handleNewGameClick={resetGame} />
      <Game cards={cards} handleCardClick={handleCardClick} />
    </>
  );
}

export default App;
