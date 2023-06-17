import { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([
    { name: 'steven deloach', hobbies: ['fishing', 'javascript', 'c++'] },
    { name: 'tim murphy', hobbies: ['pool cleaning', 'apple stuff'] },
    { name: 'david miller', hobbies: ['mopar', 'red shirts'] },
    {
      name: 'ben sprague',
      hobbies: ['green egg', 'watch commanding', 'roof repairing', 'baseball playing fool']
    }
  ]);

  function displayBoxes(boxData) {
    setTimeout(() => {
      const boxIndex = getRandomArrayIndex(data.length);
      const hobbyIndex = getRandomArrayIndex(data[boxIndex].hobbies.length);
      const dataCopy = JSON.parse(JSON.stringify(data));
      dataCopy[boxIndex].hobbies.splice(hobbyIndex, 1);
      setData(dataCopy);
    }, 5000);

    return boxData.map(d => (
      <div className='box' key={crypto.randomUUID()}>
        <div className='title'>{d.name}</div>
        <div className='subtitle'>{displayHobbies(d.hobbies)}</div>
      </div>
    ));
  }

  function getRandomArrayIndex(arraySize) {
    return Math.floor(Math.random() * arraySize);
  }

  function displayHobbies(hobbies) {
    let text = `hobbies: ${hobbies[0]}`;

    for (let i = 1; i < hobbies.length; ++i) {
      text = `${text}, ${hobbies[i]}`;
    }

    return <div className='subtitle'>{text}</div>;
  }

  return <div className='app'>{displayBoxes(data)}</div>;
}

export default App;
