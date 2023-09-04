import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [correctCountry, setCorrectCountry] = useState('');
  const [selection, setSelection] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,flags')
      .then(response => response.json())
      .then(data => setAllCountries(data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    newGame();
  }, [allCountries]);

  function handleSubmit(e) {
    e.preventDefault();

    if (correctCountry === selection) {
      setMessage('That is correct!');
    } else {
      setMessage(
        'That is incorrect. The correct answer is ' + countries[+correctCountry].name.common + '.'
      );
    }
  }

  function handleRadioBtn(e) {
    e.target.checked = true;
    setSelection(e.target.id);
  }

  function newGame() {
    let shuffled = [...allCountries];
    let i = allCountries.length;
    let temp;
    let index;

    while (i--) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }

    // randomly set four countries as choices
    setCountries(shuffled.slice(0, 4));

    // pick random country as answer
    setCorrectCountry(Math.floor(Math.random() * 4).toString());

    // clear message
    setMessage(null);

    // uncheck all radio buttons
    let radio = document.querySelector('input[type=radio]:checked');
    radio && (radio.checked = false);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Guess the flag:</legend>
          {countries.map((country, idx) => (
            <div key={idx}>
              <input
                autoComplete='off'
                disabled={message}
                id={idx}
                name='country'
                onChange={handleRadioBtn}
                type='radio'
                value={country.name.common}
              />
              <label htmlFor={idx}>{country.name.common}</label>
            </div>
          ))}
          <button type='submit' disabled={selection === '' || message}>
            Submit
          </button>
          <button type='button' onClick={newGame}>
            New Game
          </button>
        </fieldset>
      </form>
      <div>
        {countries
          .filter((country, idx) => idx === +correctCountry)
          .map((country, idx) => (
            <svg key={idx} height='202' width='402' xmlns='http://www.w3.org/2000/svg'>
              <image href={country.flags.svg} height='200' />
            </svg>
          ))}
      </div>
      <h1>{message}</h1>
    </>
  );
}

export default App;
