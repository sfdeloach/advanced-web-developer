import { useEffect, useState } from 'react';
import Box from './Box';
import './App.css';

const colors = [
  '#0000ff',
  '#0000ef',
  '#0000df',
  '#0000cf',
  '#0000bf',
  '#0000af',
  '#00009f',
  '#00008f',
  '#00007f',
  '#00006f',
  '#00005f',
  '#00004f',
  '#00003f',
  '#00002f',
  '#00001f',
  '#00000f',
  '#1000ff',
  '#2000ff',
  '#3000ff',
  '#4000ff',
  '#5000ff',
  '#6000ff',
  '#7000ff',
  '#8000ff',
  '#9000ff',
  '#0010ff',
  '#0020ff',
  '#0030ff',
  '#0040ff',
  '#0050ff',
  '#0060ff',
  '#0070ff',
  '#0080ff',
  '#0090ff'
];

export default function App() {
  const NUM_BOXES = 32;

  const [colorIndex, setColorIndex] = useState(
    (function () {
      const result = [];

      for (let i = 0; i < NUM_BOXES; ++i) {
        result.push(i % colors.length);
      }

      return result;
    })()
  );

  function randomIndex(maxNumber) {
    return Math.floor(Math.random() * maxNumber);
  }

  function boxProducer(qty) {
    const result = [];

    for (let i = 0; i < qty; ++i) {
      result.push(<Box boxColor={colors[colorIndex[i]]} key={'ID_' + i} />);
    }

    return result;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const colorIndexCopy = JSON.parse(JSON.stringify(colorIndex));
      colorIndexCopy[randomIndex(NUM_BOXES)] = randomIndex(colors.length);
      setColorIndex(colorIndexCopy);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [colorIndex]);

  return <div className='App'>{boxProducer(NUM_BOXES)}</div>;
}
