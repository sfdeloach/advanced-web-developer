import './Box.css';

export default function Box({ boxColor }) {
  return (
    <div className='Box' style={{ backgroundColor: boxColor }}>
      {boxColor}
    </div>
  );
}
