import Recipe from './Recipe';
import './RecipeList.css';

function RecipeList({ recipes, handleDelete }) {
  const recipeList = recipes.map((recipe, index) => (
    <Recipe key={`key_${index}`} recipe={recipe} index={index} handleDelete={handleDelete} />
  ));

  return <div className='gallery'>{recipeList}</div>;
}

export default RecipeList;
