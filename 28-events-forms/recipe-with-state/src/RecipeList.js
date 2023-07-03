import Recipe from './Recipe';
import './RecipeList.css';

function RecipeList() {
  return (
    <div className='gallery'>
      <Recipe />
      <Recipe />
      <Recipe />
    </div>
  );
}

export default RecipeList;
