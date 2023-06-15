import { useState } from "react"
import './App.css';

function App() {

  const [a, setA] = useState({ x: 0, y: 300 }) // start point (x: time, y: value)
  const [b, setB] = useState({ x: 400, y: 100 }) // end point (x: time, y: value)
  const [c, setC] = useState({ x: 200, y: 100 }) // control point (x: time, y: value)

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    setC({ x: clientX, y: clientY });
  }

  function calculateY(x, x0, x1, x2, y0, y1, y2) {
    // Solve for t using the quadratic formula
    const A = x0 - 2 * x1 + x2;
    const B = 2 * x1 - 2 * x0;
    const C = x0 - x;
  
    const discriminant = B * B - 4 * A * C;
  
    if (discriminant < 0) {
      // No real solutions exist, return null or handle the error case
      return null;
    }
  
    const t1 = (-B + Math.sqrt(discriminant)) / (2 * A);
    const t2 = (-B - Math.sqrt(discriminant)) / (2 * A);
  
    // Choose the valid value of t between 0 and 1
    const t = (t1 >= 0 && t1 <= 1) ? t1 : t2;
  
    // Calculate y(x) using the given equation
    const y = Math.pow(1 - t, 2) * y0 + 2 * (1 - t) * t * y1 + Math.pow(t, 2) * y2;
  
    return y;
  }

  const points = () => {
    const nPoints = 20;
    const elements = [];

    for (let i = 0; i < nPoints; i++) {
      const t = i / (nPoints - 1); // Calculate the parameter 't' for equally spaced points
      const x = t*400;
      const y = calculateY(x, a.x, c.x, b.x, a.y, c.y, b.y)
      elements.push(<circle key={i} cx={x} cy={y} r="10" fill="red" />);
    }

    return elements;
  };
  return (
    <div className="App" onMouseMove={handleMouseMove}>
      <svg width="400" height="400" style={{ border: "1px solid black" }}>
        {points()}
        <path
          d={`M ${a.x} ${a.y} Q ${c.x} ${c.y}, ${b.x} ${b.y}`}
          fill="none"
          stroke="black"
          strokeWidth="2"
        />
        <circle cx={a.x} cy={a.y} r="10" fill="blue" />
        <circle cx={b.x} cy={b.y} r="10" fill="blue" />
        <circle cx={c.x} cy={c.y} r="10" fill="blue" />
      </svg>
    </div>
  );
}

export default App;
