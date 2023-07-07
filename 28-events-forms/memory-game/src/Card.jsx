import { COLORS, CARD_COLORS } from './assets/settings';

function Card({ card, handleCardClick }) {
  return (
    <div
      style={{
        width: '120px',
        height: '160px',
        backgroundColor: card.isVisible ? CARD_COLORS[card.colorValue] : COLORS.cardBack,
        borderRadius: '12px',
        margin: '8px',
        cursor: 'pointer'
      }}
      onClick={() => !card.isVisible && handleCardClick(card.id)}
    ></div>
  );
}

export default Card;
