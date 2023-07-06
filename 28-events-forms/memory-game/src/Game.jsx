import Card from './Card';

function Game({ cards, handleCardClick }) {
  return (
    <>
      <div
        style={{
          padding: '1rem 4rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          justifyItems: 'center'
        }}
      >
        {cards.map(card => {
          return <Card key={card.id} card={card} handleCardClick={handleCardClick} />;
        })}
      </div>
    </>
  );
}

export default Game;
