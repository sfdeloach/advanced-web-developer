import { COLORS, CARD_COLORS } from './assets/settings';

function Card({ card, handleCardClick }) {
  return (
    <div
      className='card'
      style={{
        width: '100px',
        height: '160px',
        backgroundColor: card.isVisible ? CARD_COLORS[card.colorValue] : COLORS.cardBack,
        border: `8px solid ${COLORS.cardBack}`,
        borderRadius: '12px',
        margin: '8px',
        cursor: card.isEnabled ? 'pointer' : 'not-allowed',
        transition: !card.isVisible && 'background-color 0.8s ease-out'
      }}
      onClick={() => card.isEnabled && handleCardClick(card.id)}
    />
  );
}

export default Card;
