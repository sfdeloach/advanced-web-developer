import { useContext } from 'react';
import ThemeContext from './contexts/Theme';
import RecipeList from './RecipeList';
import './Content.css';

function Content() {
  const theme = useContext(ThemeContext);

  return (
    <div className={`content ${theme}`}>
      <RecipeList />
    </div>
  );
}

export default Content;
