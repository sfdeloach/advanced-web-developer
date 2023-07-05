import { useContext, useState } from 'react';
import ThemeContext from './contexts/Theme';
import RecipeList from './RecipeList';
import RecipeForm from './RecipeForm';
import './Content.css';

function Content({ router, onReturnClick }) {
  const theme = useContext(ThemeContext);

  const [recipes, setRecipes] = useState([
    {
      directions: ['step one', 'step two', 'step three'],
      ingredients: [
        { qty: '4', unit: 'large', ingredient: 'carrots, peeled' },
        { qty: '1', unit: 'large', ingredient: 'egg' },
        { qty: '1/4', unit: 'tsp', ingredient: 'salt' }
      ],
      title: 'Carrot Cake',
      url: 'https://i.imgur.com/8J3XpiD.jpeg'
    },
    {
      directions: ['step one', 'step two', 'step three'],
      ingredients: [
        { qty: '1', unit: 'slab', ingredient: 'baby back ribs' },
        { qty: '1/2', unit: 'cup', ingredient: 'brown sugar' },
        { qty: '1', unit: 'tbsp', ingredient: 'salt' }
      ],
      title: 'Baby Back Ribs',
      url: 'https://i.imgur.com/LSeD0qp.jpeg'
    },
    {
      directions: ['step one', 'step two', 'step three'],
      ingredients: [
        { qty: '1', unit: 'cup', ingredient: 'corn' },
        { qty: '1', unit: 'cup', ingredient: 'all-purpose flour' },
        { qty: '1', unit: 'medium', ingredient: 'egg' },
        { qty: '1', unit: 'cup', ingredient: 'whole milk' }
      ],
      title: 'Cornbread',
      url: 'https://i.imgur.com/ReVZGi2.jpeg'
    },
    {
      directions: ['step one', 'step two', 'step three'],
      ingredients: [
        { qty: '4', unit: 'large', ingredient: 'carrots, peeled' },
        { qty: '1', unit: 'large', ingredient: 'egg' },
        { qty: '1/4', unit: 'tsp', ingredient: 'salt' }
      ],
      title: 'Carrot Cake',
      url: 'https://i.imgur.com/8J3XpiD.jpeg'
    },
    {
      directions: ['step one', 'step two', 'step three'],
      ingredients: [
        { qty: '1', unit: 'slab', ingredient: 'baby back ribs' },
        { qty: '1/2', unit: 'cup', ingredient: 'brown sugar' },
        { qty: '1', unit: 'tbsp', ingredient: 'salt' }
      ],
      title: 'Baby Back Ribs',
      url: 'https://i.imgur.com/LSeD0qp.jpeg'
    },
    {
      directions: ['step one', 'step two', 'step three'],
      ingredients: [
        { qty: '1', unit: 'cup', ingredient: 'corn' },
        { qty: '1', unit: 'cup', ingredient: 'all-purpose flour' },
        { qty: '1', unit: 'medium', ingredient: 'egg' },
        { qty: '1', unit: 'cup', ingredient: 'whole milk' }
      ],
      title: 'Cornbread',
      url: 'https://i.imgur.com/ReVZGi2.jpeg'
    },
    {
      directions: ['step one', 'step two', 'step three'],
      ingredients: [
        { qty: '4', unit: 'large', ingredient: 'carrots, peeled' },
        { qty: '1', unit: 'large', ingredient: 'egg' },
        { qty: '1/4', unit: 'tsp', ingredient: 'salt' }
      ],
      title: 'Carrot Cake',
      url: 'https://i.imgur.com/8J3XpiD.jpeg'
    },
    {
      directions: ['step one', 'step two', 'step three'],
      ingredients: [
        { qty: '1', unit: 'slab', ingredient: 'baby back ribs' },
        { qty: '1/2', unit: 'cup', ingredient: 'brown sugar' },
        { qty: '1', unit: 'tbsp', ingredient: 'salt' }
      ],
      title: 'Baby Back Ribs',
      url: 'https://i.imgur.com/LSeD0qp.jpeg'
    },
    {
      directions: ['step one', 'step two', 'step three'],
      ingredients: [
        { qty: '1', unit: 'cup', ingredient: 'corn' },
        { qty: '1', unit: 'cup', ingredient: 'all-purpose flour' },
        { qty: '1', unit: 'medium', ingredient: 'egg' },
        { qty: '1', unit: 'cup', ingredient: 'whole milk' }
      ],
      title: 'Cornbread',
      url: 'https://i.imgur.com/ReVZGi2.jpeg'
    }
  ]);

  function deleteRecipe(index) {
    const copy = JSON.parse(JSON.stringify(recipes));
    copy.splice(index, 1);
    setRecipes(copy);
  }

  function handleSubmit(e, numDirections, numIngredients) {
    e.preventDefault();
    const directions = [];
    const ingredients = [];

    // create an Object from the form data
    const formObject = Object.fromEntries(new FormData(e.target).entries());

    // combine directions into an array and remove element from the form

    for (let i = 0; i < numDirections; ++i) {
      directions.push(formObject[`direction_${i}`]);
      delete formObject[`direction_${i}`];
    }

    // combine ingredients into an array
    for (let i = 0; i < numIngredients; ++i) {
      ingredients.push({
        qty: formObject[`qty_${i}`],
        unit: formObject[`unit_${i}`],
        ingredient: formObject[`ingredient_${i}`]
      });

      delete formObject[`qty_${i}`];
      delete formObject[`unit_${i}`];
      delete formObject[`ingredient_${i}`];
    }

    // add new arrays to the formObject
    formObject.directions = directions;
    formObject.ingredients = ingredients;

    // create a deep copy of recipes and add new recipe
    const updatedRecipes = JSON.parse(JSON.stringify(recipes));
    updatedRecipes.push(formObject);
    setRecipes(updatedRecipes);
    onReturnClick();
  }

  return (
    <div className={`content ${theme}`}>
      {router === 'form' ? (
        <RecipeForm onReturnClick={onReturnClick} onAddRecipeClick={handleSubmit} />
      ) : (
        <RecipeList recipes={recipes} handleDelete={deleteRecipe} />
      )}
    </div>
  );
}

export default Content;
