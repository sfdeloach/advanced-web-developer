import Recipe from './Recipe';
import './App.css';

function App() {
  return (
    <div className="App">
      <Recipe title="Pasta"
        ingredients={["eggs", "flour", "water"]}
        image="pasta.jpg"
        instructions="Combine all listed ingredients in a bowl and mix it up, you fool."
      />
    </div>
  );
}

export default App;
