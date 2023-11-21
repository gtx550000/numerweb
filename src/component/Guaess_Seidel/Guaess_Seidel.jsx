import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';


function MatrixInput() {
  const [dimension, setDimension] = useState(2);
  const [matrix, setMatrix] = useState(Array.from({ length: dimension }, () => Array(dimension+1).fill(0)));
  const [answer, setAnswer] = useState([]);

  const handleDimensionChange = (e) => {
    const newDimension = parseInt(e.target.value, 10);
    setDimension(newDimension);
    setMatrix(Array.from({ length: newDimension }, () => Array(newDimension+1).fill(0)));
  };

  const handleMatrixChange = (e, rowIndex, colIndex) => {
    const newValue = parseFloat(e.target.value);
    const newMatrix = [...matrix];
    newMatrix[rowIndex][colIndex] = newValue;
    setMatrix(newMatrix);
  };

  const gaussSeidel = (A, b) => {
    const maxIterations = 1000;
    const tolerance = 0.0001;
    let x = Array(dimension).fill(0);
    let previousX = Array(dimension).fill(0);

    for (let iteration = 0; iteration < maxIterations; iteration++) {
      for (let i = 0; i < dimension; i++) {
        let sum = b[i];

        for (let j = 0; j < dimension; j++) {
          if (i !== j) {
            sum -= A[i][j] * x[j];
          }
        }

        x[i] = sum / A[i][i];
      }

      let difference = x.map((value, index) => Math.abs(value - previousX[index]));
      if (Math.max(...difference) < tolerance) {
        break;
      }

      previousX = [...x];
    }

    return x;
  };

  const calculate = () => {
    const A = matrix.map(row => row.slice(0, dimension));
    const b = matrix.map(row => row[dimension]);
    const result = gaussSeidel(A, b);
    setAnswer(result);
  };

  return (
    <div>

       <center><h2>Gauss Seidel</h2></center>
      
      <div className='camx'>
        <TextField  label="Enter Matrix:"  type="number" min="2" value={dimension} onChange={handleDimensionChange} />
      </div>

      <div>
        {matrix.map((row, rowIndex) => (
          <div className='inputmx' key={rowIndex}>
            {row.map((value, colIndex) => (
              <TextField  label=""
                key={colIndex}
                type="number"
                value={value}
                onChange={(e) => handleMatrixChange(e, rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>

      <div className='camx'>
        <Button variant="contained"  onClick={calculate}>Calculate </Button>
      </div>
      
      <div  className='inputmx'>
        <h3>{answer.map((value, index) => (<p>x{index + 1}: {value.toFixed(4)}</p>))}</h3>
      </div>

    </div>
  );
}

export default MatrixInput;