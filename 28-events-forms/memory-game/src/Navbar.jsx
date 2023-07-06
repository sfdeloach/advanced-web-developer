import { useState } from 'react';
import { COLORS } from './assets/settings';

const navbarCSS = {
  backgroundColor: COLORS.navbarBackground,
  color: COLORS.navbarText,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

function Navbar({ handleNewGameClick }) {
  const [hoverEffect, setHoverEffect] = useState({
    color: COLORS.navbarText,
    fontWeight: '400'
  });

  return (
    <div style={navbarCSS}>
      <h1 style={{ paddingLeft: '1rem' }}>Memory Game</h1>
      <h2
        style={{
          paddingRight: '1rem',
          color: hoverEffect.color,
          fontWeight: hoverEffect.fontWeight,
          cursor: 'pointer'
        }}
        onMouseEnter={() => setHoverEffect({ color: COLORS.navbarTextHover, fontWeight: '400' })}
        onMouseLeave={() => setHoverEffect({ color: COLORS.navbarText, fontWeight: '400' })}
        onClick={handleNewGameClick}
      >
        New Game
      </h2>
    </div>
  );
}

export default Navbar;
