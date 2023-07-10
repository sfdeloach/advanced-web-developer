import { useState, useEffect } from 'react';
import { CARD_COLORS } from './assets/settings';
import Navbar from './Navbar';
import Game from './Game';

function App() {
  const [cards, setCards] = useState(createCards());
  const [selected, setSelected] = useState([]);

  // setCards() will cause re-renders to occur, however, it will not update the reference to cards,
  // which is an advantage as it is unnecessary to make a copy
  useEffect(() => {
    if (selected.length === 2) {
      // freeze cards, this will cause all cards to temporarily ignore mouse clicks, but it will
      // not update the reference to cards just yet, as you will see, setCards() is called a few
      // more times in this closure and the reference to cards is referring to its original state
      setCards(
        cards.map(card => {
          return { ...card, isEnabled: false };
        })
      );

      if (selected[0].colorValue !== selected[1].colorValue) {
        setTimeout(
          () =>
            setCards(
              cards.map(card =>
                card.id === selected[0].id || card.id === selected[1].id
                  ? { ...card, isVisible: false, isEnabled: true }
                  : card
              )
            ),
          1000
        );
      } else {
        setCards([...cards]);
      }

      // clear selected cards
      setSelected([]);
    }
  }, [selected]);

  function handleCardClick(id) {
    setCards(
      cards.map(card => (card.id === id ? { ...card, isVisible: true, isEnabled: false } : card))
    );

    setSelected([...selected, cards[id]]);
  }

  function getRandomInt(max, min = 0) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  function createCards(quantity = 16, numColors = CARD_COLORS.length) {
    const topCards = new Set(),
      bottomCards = new Set();

    while (topCards.size < numColors) {
      topCards.add(getRandomInt(numColors));
    }

    while (bottomCards.size < numColors) {
      bottomCards.add(getRandomInt(numColors));
    }

    return [...topCards, ...bottomCards].map((colorNumber, idx) => {
      return {
        colorValue: colorNumber,
        id: idx,
        isEnabled: true,
        isVisible: false
      };
    });
  }

  function resetGame() {
    setCards(createCards());
  }

  return (
    <>
      <Navbar handleNewGameClick={resetGame} />
      <Game cards={cards} handleCardClick={handleCardClick} />
    </>
  );
}

export default App;
