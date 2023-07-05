import { useState } from 'react';

function IngredientEntries({ quantity }) {
  const entries = [];

  for (let i = 0; i < quantity; ++i) {
    entries.push(
      <div key={`key_${i}`}>
        <input type='number' name={`qty_${i}`} />
        <select name={`unit_${i}`}>
          <option value='cup'>cup</option>
          <option value='tsp'>tsp</option>
          <option value='tbsp'>tbsp</option>
          <option value='small'>small</option>
          <option value='medium'>medium</option>
          <option value='large'>large</option>
          <option value='slab'>slab</option>
          <option value='pinch'>pinch</option>
          <option value='unit'>unit</option>
        </select>
        <input type='text' name={`ingredient_${i}`} />
      </div>
    );
  }

  return entries;
}

function DirectionEntries({ quantity }) {
  const entries = [];

  for (let i = 0; i < quantity; ++i) {
    entries.push(
      <div key={`key_${i}`}>
        <input type='text' name={`direction_${i}`} />
      </div>
    );
  }

  return entries;
}

function RecipeForm({ onReturnClick, onAddRecipeClick }) {
  const [numDirections, setNumDirections] = useState(1);
  const [numIngredients, setNumIngredients] = useState(1);

  return (
    <form
      method='post'
      onSubmit={e => onAddRecipeClick(e, numDirections, numIngredients)}
      className='form'>
      <label>
        Title:
        <input type='text' name='title' />
      </label>
      <label>
        Image URL:
        <input type='url' name='url' />
      </label>
      <div>
        <label>
          Ingredients:
          <IngredientEntries quantity={numIngredients} />
          <button type='button' onClick={() => setNumIngredients(numIngredients + 1)}>
            add
          </button>
        </label>
      </div>
      <div>
        <label>
          Directions:
          <DirectionEntries quantity={numDirections} />
          <button type='button' onClick={() => setNumDirections(numDirections + 1)}>
            add
          </button>
        </label>
      </div>
      <div>
        <button type='button' onClick={onReturnClick}>
          Cancel
        </button>
        <button type='reset'>Reset</button>
        <button type='submit'>Add recipe</button>
      </div>
    </form>
  );
}

export default RecipeForm;
