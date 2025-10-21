import { useState } from 'react';
import './App.css';

// Define the array of colors and their corresponding values
// this is requirements 1 and 2
const MyColors = [
  { value: 7, color: '#000100ff' },
  { value: 8, color: '#0b0698ff' },
  { value: 9, color: '#df3009ff' },
  { value: 4, color: '#bcb008ff' },
  { value: 5, color: '#000100ff' },
  { value: 6, color: '#0b0698ff' },
  { value: 1, color: '#df3009ff' },
  { value: 2, color: '#bcb008ff' },
  { value: 3, color: '#000100ff' },
  
];

// Block component to represent each colored block
// this is requirement 3
const Block = ({ color, children, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const blockStyle = {
    //this covers requirement 5
    backgroundColor: isHovered ? 'white' : color,
    color: isHovered ? 'black' : '#fff',
    width: '100px',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '40px',
  };

  return (
    <div
      style={blockStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)} >
      {children}
    </div>
  );
};

// this is requirement 4
const ColorGrid = ({ colorArray }) => {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 100px)',
    justifyContent: 'center',
  };

  return (
    <div style={gridStyle} >
      {colorArray.map((item, index) => (
        // this covers requirement 6
        <Block key={index} color={item.color} onClick={() => alert(`Block number: ${item.value}`)}>
          {item.value}
        </Block>
      ))}
    </div>
  );
};

function App() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Color Grid</h1>
      <ColorGrid colorArray={MyColors} />
    </div>
  );
}

export default App;