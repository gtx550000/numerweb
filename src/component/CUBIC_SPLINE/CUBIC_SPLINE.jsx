import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

const CubicSpline = () => {
  const [points, setPoints] = useState([{ x: 0, y: 0 }, { x: 1, y: 1 }]);
  const [xValue, setXValue] = useState(0);
  const [yValue, setYValue] = useState(null);
  const [error, setError] = useState('');

  const handlePointChange = (e, index, type) => {
    const newPoints = [...points];
    if (isNaN(e.target.value)) {
      return;
    }
    newPoints[index][type] = parseFloat(e.target.value);
    setPoints(newPoints);
  };

  const addPoint = () => {
    setPoints([...points, { x: 0, y: 0 }]);
  };

  const calculateY = () => {
    const y = lagrangeInterpolation(xValue);
    setYValue(y);
  };
  const lagrangeInterpolation = (x) => {
    let result = 0;
    
    // Sort the points by x-values
    const sortedPoints = [...points].sort((a, b) => a.x - b.x);

    for (let i = 0; i < sortedPoints.length; i++) {
        let term = sortedPoints[i].y;
        for (let j = 0; j < sortedPoints.length; j++) {
            if (i !== j) {
                if (sortedPoints[i].x === sortedPoints[j].x) {
                    setError('Two points have the same x-value. Please correct.');
                    return;
                }
                term = term * (x - sortedPoints[j].x) / (sortedPoints[i].x - sortedPoints[j].x);
            }
        }
        result += term;
    }
    setError('');  // Clear error if there is no problem
    return result;
};

  return (
    <div>
       <center><h2>Cubic Spline</h2></center>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className='inputmx'>
        <label>
          <TextField  label="input x:" type="number"value={xValue}onChange={(e) => setXValue(parseFloat(e.target.value))}  />
        </label>
      </div>
   
      <div  className='camx'>
        <Button variant="contained" onClick={addPoint}>Add Point</Button>
      </div>

      <div>
        {points.map((point, index) => (
          <div className='inputmx' key={index}>
            <TextField  label=""
              type="number"
              value={point.x}
              onChange={(e) => handlePointChange(e, index, 'x')}
            />
            <TextField  label=""
              type="number"
              value={point.y}
              onChange={(e) => handlePointChange(e, index, 'y')}
            />
          </div>
        ))}
        
      </div>

      <div  className='camx'>
        <Button variant="contained" onClick={calculateY}>Calculate y</Button>
      </div>

      <div className='inputmx'>
       <h2>{yValue !== null && <p>Result: y = {yValue}</p>}</h2>
      </div>

    </div>
  );
};

export default CubicSpline;
