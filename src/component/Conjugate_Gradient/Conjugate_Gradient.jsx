import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';


function MatrixInput() {
    const [dimension, setDimension] = useState(2);
    const [matrix, setMatrix] = useState(Array.from({ length: dimension }, () => Array(dimension + 1).fill(0)));
    const [answer, setAnswer] = useState([]);
    const [numIterations, setNumIterations] = useState(0); // Change this to store the number of iterations

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

    const dotProduct = (a, b) => a.reduce((acc, val, index) => acc + val * b[index], 0);

    const matrixVectorMult = (A, vec) => A.map(row => dotProduct(row, vec));

    const subtractVectors = (a, b) => a.map((val, index) => val - b[index]);

    const addVectors = (a, b) => a.map((val, index) => val + b[index]);

    const scalarMult = (scalar, vec) => vec.map(val => scalar * val); 

    const calculate = () => {
        const A = matrix.map(row => row.slice(0, dimension));
        const b = matrix.map(row => row[dimension]);

        let x = Array(dimension).fill(0);
        let r = subtractVectors(b, matrixVectorMult(A, x));
        let p = [...r];
        let rsold = dotProduct(r, r);

        let iterationCount = 0; // Use this to count the iterations

        for (let i = 0; i < dimension; i++) {
            const Ap = matrixVectorMult(A, p);
            const alpha = rsold / dotProduct(p, Ap);
            x = addVectors(x, scalarMult(alpha, p));
            r = subtractVectors(r, scalarMult(alpha, Ap));

            iterationCount++; // Increment the iteration count

            const rsnew = dotProduct(r, r);
            if (Math.sqrt(rsnew) < 1e-10) break;
            p = addVectors(r, scalarMult(rsnew / rsold, p));
            rsold = rsnew;
        }

        setAnswer(x);
        setNumIterations(iterationCount); // Set the counted iterations
    };

    return (
        <div>

        <center><h2>Conjugate Gradient</h2></center>
           
        <div className='camx'>
          <TextField  label="Enter Matrix:" type="number" min="2" value={dimension} onChange={handleDimensionChange} />
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
              <Button variant="contained"  onClick={calculate}>Calculate</Button>
            </div>

            <div className='inputmx' >
                <h3>Answer:</h3>
                <h3>{answer.map((value, index) => (<p key={index}>x{index}: {value.toFixed(4)}</p>))}</h3> 
            </div>

            <div  className='inputmx'>
                <h3>Number of Iterations:</h3>
                <h3><p>{numIterations}</p></h3> {/* Display the number of iterations here */}
            </div>
        </div>
    );
}

export default MatrixInput;