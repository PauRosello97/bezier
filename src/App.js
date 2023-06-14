import {useState} from "react"
import './App.css';

function calculateQuadraticBezierY(startPoint, endPoint, controlPoint, x) {
  const { x: x1, y: y1 } = startPoint;
  const { x: x3, y: y3 } = endPoint;
  const { x: x2, y: y2 } = controlPoint;

  const t = solveQuadraticEquation(x1 - 2 * x2 + x3, 2 * (x2 - x1), x1 - x);

  const y = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * y2 + t * t * y3;

  return y;
}

function solveQuadraticEquation(a, b, c) {
  const discriminant = b * b - 4 * a * c;
  const t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
  const t2 = (-b - Math.sqrt(discriminant)) / (2 * a);

  if (t1 >= 0 && t1 <= 1) return t1;
  if (t2 >= 0 && t2 <= 1) return t2;

  return null; // No valid solution within the range [0, 1]
}

function App() {

  const [a, setA] = useState({x: 0, y: 50}) // start point (x: time, y: value)
  const [b, setB] = useState({x: 400, y: 100}) // end point (x: time, y: value)
  const [c, setC] = useState({x: 200, y: 100}) // control point (x: time, y: value)

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    setC({ x: clientX, y: clientY });
  }

  // This points are used to prove that calculateQuadraticBezierY() works
  const points = () => {
    const nPoints = 20
    const elements = []

    for(let i=0; i<nPoints; i++){
      const x = i*400/nPoints
      const y = calculateQuadraticBezierY(a, b, c, x/400)
      elements.push(<circle cx={x} cy={y*400} r="5" fill="red" />)  
    }

    return elements
  }

  return (
    <div className="App" onMouseMove={handleMouseMove}>
      <svg width="400" height="400">
        {/* points() */ }
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
