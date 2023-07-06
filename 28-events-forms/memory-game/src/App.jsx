import { useState } from 'react';
import { CARD_COLORS } from './assets/settings';
import Navbar from './Navbar';
import Game from './Game';

// TODO: add randomness to colorValue assignment
function createCards(quantity = 16, numColors = CARD_COLORS.length) {
  const result = [];

  for (let i = 0; i < quantity; ++i) {
    result.push({ id: i, colorValue: i % numColors, isVisible: false, isMatched: false });
  }

  return result;
}

function App() {
  const [cards, setCards] = useState(createCards());

  function resetGame() {
    setCards(createCards());
  }

  function toggleCard(id) {
    const cardsCopy = [...cards];
    cardsCopy[id].isVisible = !cardsCopy[id].isVisible;
    setCards(cardsCopy);
  }

  return (
    <>
      <Navbar handleNewGameClick={resetGame} />
      <Game cards={cards} handleCardClick={toggleCard} />
    </>
  );
}

export default App;
