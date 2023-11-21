import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

function MatrixInput() {
  const [dimension, setDimension] = useState(2);
  const [matrix, setMatrix] = useState(Array.from({ length: dimension }, () => Array(dimension + 1).fill(0)));
  const [answer, setAnswer] = useState([]);

  const handleDimensionChange = (e) => {
    const newDimension = parseInt(e.target.value, 10);
    setDimension(newDimension);
    setMatrix(Array.from({ length: newDimension }, () => Array(newDimension + 1).fill(0)));
  };

  const handleMatrixChange = (e, rowIndex, colIndex) => {
    const newValue = parseFloat(e.target.value);
    const newMatrix = [...matrix];
    newMatrix[rowIndex][colIndex] = newValue;
    setMatrix(newMatrix);
  };

  const dotProduct = (a, b) => {
    let result = 0;
    for (let i = 0; i < a.length; i++) {
      result += a[i] * b[i];
    }
    return result;
  };

  const matrixVectorMult = (mat, vec) => {
    const res = Array(vec.length).fill(0);
    for (let i = 0; i < mat.length; i++) {
      for (let j = 0; j < mat[i].length - 1; j++) {
        res[i] += mat[i][j] * vec[j];
      }
    }
    return res;
  };

  const calculate = () => {
    const A = matrix.map(row => row.slice(0, dimension));
    const b = matrix.map(row => row[dimension]);

    const x = Array(dimension).fill(0);  // initial guess
    let r = b.slice();
    let d = r.slice();
    let deltaNew = dotProduct(r, r);
    const delta0 = deltaNew;

    for (let i = 0; i < dimension; i++) {
      const q = matrixVectorMult(A, d);
      const alpha = deltaNew / dotProduct(d, q);
      for (let j = 0; j < dimension; j++) {
        x[j] = x[j] + alpha * d[j];
        r[j] = r[j] - alpha * q[j];
      }
      const deltaOld = deltaNew;
      deltaNew = dotProduct(r, r);
      if (Math.sqrt(deltaNew) < 1e-10) break; // tolerance
      const beta = deltaNew / deltaOld;
      for (let j = 0; j < dimension; j++) {
        d[j] = r[j] + beta * d[j];
      }
    }

    setAnswer(x);
  };

  return (
    <div>

      <center><h2>Jacobi_Iteration</h2></center>

      <div className='inputmx'>
       <TextField  label="Enter Matrix:" type="number" min="2" value={dimension} onChange={handleDimensionChange} />
      </div>

      <div>
      <center><h3>Enter Matrix Values:</h3></center>
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

      <div className='inputmx'>
        <Button variant="contained" onClick={calculate}>Calculate</Button>
      </div>

      <div className='camx'>
         <h2>{answer.map((value, index) => (<p>x{index}: {value.toFixed(4)}</p>))}</h2>
      </div>

    </div>
  );
}

export default MatrixInput;