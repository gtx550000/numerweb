import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';


const GaussianJordan = () => {
  const [desiredRowCount, setDesiredRowCount] = useState(3);
  
  
  const [matrix, setMatrix] = useState(Array(3).fill().map(() => Array(4).fill(0)));
  const [solutions, setSolutions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const solve = () => {
    const n = matrix.length;
    const augmentedMatrix = matrix.map((row, i) => [...row, i === n - 1 ? 1 : 0]);

    for (let i = 0; i < n; i++) {
      // Pivoting
      let maxRow = i;
      for (let j = i + 1; j < n; j++) {
        if (Math.abs(augmentedMatrix[j][i]) > Math.abs(augmentedMatrix[maxRow][i])) {
          maxRow = j;
        }
      }
      [augmentedMatrix[i], augmentedMatrix[maxRow]] = [augmentedMatrix[maxRow], augmentedMatrix[i]];

      // Elimination
      for (let j = i + 1; j < n; j++) {
        const factor = augmentedMatrix[j][i] / augmentedMatrix[i][i];
        for (let k = i; k < n * 2; k++) {
          augmentedMatrix[j][k] -= factor * augmentedMatrix[i][k];
        }
      }
    }

    // Back substitution
    const result = [];
for (let i = n - 1; i >= 0; i--) {
  let sum = 0;
  for (let j = i + 1; j < n; j++) {
    sum += augmentedMatrix[i][j] * result[j - i - 1]; // Fix the indexing here
  }
  result.unshift((augmentedMatrix[i][n] - sum) / augmentedMatrix[i][i]);
}

    if (result.some(isNaN)) {
      setErrorMessage('No unique solution exists.');
      setSolutions([]);
    } else {
      setErrorMessage('');
      setSolutions(result);
    }
  };

  const handleInputChange = (e, rowIdx, colIdx) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      const newMatrix = [...matrix];
      newMatrix[rowIdx][colIdx] = newValue;
      setMatrix(newMatrix);
    }
  };

  const handleSizeChange = () => {
    const newMatrix = Array(desiredRowCount).fill().map(() => Array(desiredRowCount+1).fill(0));
    setMatrix(newMatrix);
  };

  return (
    <div>
      <center><h2>Gaussian Michel Jordan Elimination</h2></center>

      <div className='inputmx'>
        <TextField  label="Enter Matrix:"  type="number"  value={desiredRowCount}   onChange={(e) => setDesiredRowCount(Number(e.target.value))}min={1}/> 
      </div>

      <div className='camx'>
        <Button variant="contained"  onClick={handleSizeChange}>Apply</Button>
      </div>

      <div>
      <center><h3>Enter Matrix Values:</h3></center>
      </div>

      <div>
        {matrix.map((row, rowIdx) => (
          <div className='inputmx' key={rowIdx}>
            {row.map((cell, colIdx) => (
              <TextField  label="" step="0.1"key={colIdx}type="text"value={cell}onChange={(e) => handleInputChange(e, rowIdx, colIdx)}/>
            ))}
          </div>
        ))}
      </div>

      <div  className='camx'>
        <Button variant="contained" onClick={solve}>Solve</Button>
      </div>

      {errorMessage && <p>{errorMessage}</p>}
      {solutions.length > 0 && (
        <div className='inputmx'>
          <h2>Solutions:</h2>
          {solutions.map((solution, idx) => (
            <p key={idx}>x{idx + 1} = {solution.toFixed(4)}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default GaussianJordan;