import { useContext } from 'react';
import ThemeContext from './contexts/Theme';
import './Navbar.css';

function Navbar({ onAddClick, onThemeClick }) {
  const theme = useContext(ThemeContext);

  return (
    <div className={`navbar ${theme}`}>
      <div className={`logo ${theme}`}>
        <span className='material-symbols-outlined'>dining</span>
        <div className='subtitle'>Recipes</div>
      </div>
      <div className='menu'>
        <div className={`menu-item ${theme}`} onClick={onAddClick}>
          <span className='material-symbols-outlined'>add_circle</span>
          <div>Add</div>
        </div>
        <div className={`menu-item ${theme}`} onClick={onThemeClick}>
          <span className='material-symbols-outlined'>
            {theme === 'light' ? 'dark_mode' : 'light_mode'}
          </span>
        </div>
      </div>
      <div className={`dropdown ${theme}`}>
        <span className='material-symbols-outlined'>menu</span>
      </div>
    </div>
  );
}

export default Navbar;
