import { useContext } from 'react';
import ThemeContext from './contexts/Theme';
import './Content.css';

function Content() {
  const theme = useContext(ThemeContext);

  return <div className={`content ${theme}`}></div>;
}

export default Content;
