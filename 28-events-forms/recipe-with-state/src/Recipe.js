import { useContext } from 'react';
import ThemeContext from './contexts/Theme';
import './Recipe.css';

function Recipe() {
  const theme = useContext(ThemeContext);
  const recipeProps = {
    title: 'Carrot Cake',
    url: 'https://i.imgur.com/8J3XpiD.jpeg',
    ingredients: [
      { qty: '1', unit: 'cup', ingredient: 'milk' },
      { qty: '1', unit: 'large', ingredient: 'egg' },
      { qty: '1/4', unit: 'tsp', ingredient: 'salt' }
    ],
    directions: ['step one', 'step two', 'step three']
  };

  return (
    <div className={`box ${theme}`}>
      <div className='title'>{recipeProps.title}</div>
      <img className='image' alt={recipeProps.title} src={recipeProps.url} />
      <div>Ingredients:</div>
      <div className='ingredients'>
        <table>
          <tbody>
            <tr>
              <td>1</td>
              <td>cup</td>
              <td>milk</td>
            </tr>
            <tr>
              <td>1</td>
              <td>large</td>
              <td>egg</td>
            </tr>
            <tr>
              <td>1/4</td>
              <td>tsp</td>
              <td>salt</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>Directions:</div>
      <div className='directions'>
        <ul>
          <li>step one</li>
          <li>step two</li>
          <li>step three</li>
        </ul>
      </div>
      <span
        className={`material-symbols-outlined ${theme}`}
        onClick={() => console.log('delete click')}>
        delete
      </span>
    </div>
  );
}

export default Recipe;
