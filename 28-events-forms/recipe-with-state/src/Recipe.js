import { useContext } from 'react';
import ThemeContext from './contexts/Theme';
import './Recipe.css';

function Recipe({ recipe, index, handleDelete }) {
  const theme = useContext(ThemeContext);

  const ingredientTable = recipe.ingredients.map((item, index) => (
    <tr key={index} className={`${theme}`}>
      <td>{item.qty}</td>
      <td>{item.unit}</td>
      <td>{item.ingredient}</td>
    </tr>
  ));

  const directionList = recipe.directions.map((item, index) => <li key={index}>{item}</li>);

  return (
    <div className={`box ${theme}`}>
      <div className='title'>{recipe.title}</div>
      <img className='image' alt={recipe.title} src={recipe.url} />
      <div className='section'>
        Ingredients
        <table>
          <tbody>{ingredientTable}</tbody>
        </table>
      </div>
      <div className='section'>
        Directions
        <ul>{directionList}</ul>
      </div>
      <span className={`material-symbols-outlined ${theme}`} onClick={() => handleDelete(index)}>
        delete
      </span>
    </div>
  );
}

export default Recipe;
