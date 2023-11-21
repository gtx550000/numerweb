import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';




const MatrixInverter = () => {
    const [size, setSize] = useState(2);
    const [matrix, setMatrix] = useState([[1, 0], [0, 1]]);
    const [inverseMatrix, setInverseMatrix] = useState(null);

    const initializeMatrix = (newSize) => {
        const newMatrix = Array.from({ length: newSize }, () => Array(newSize).fill(0));
        setMatrix(newMatrix);
        setInverseMatrix(null);
    }

    const handleChange = (e, i, j) => {
        const newMatrix = [...matrix];
        newMatrix[i][j] = parseFloat(e.target.value) || 0;
        setMatrix(newMatrix);
    }

    const invertMatrix = (matrix) => {
        const n = matrix.length;
        const iden = Array.from({ length: n }, (_, i) => 
            Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
        );

        for (let i = 0; i < n; i++) {
            let max = i;
            for (let j = i + 1; j < n; j++) {
                if (Math.abs(matrix[j][i]) > Math.abs(matrix[max][i])) {
                    max = j;
                }
            }

            [matrix[i], matrix[max]] = [matrix[max], matrix[i]];
            [iden[i], iden[max]] = [iden[max], iden[i]];

            const pivot = matrix[i][i];
            if (Math.abs(pivot) === 0) {
                // Matrix is singular and not invertible
                return null;
            }

            for (let j = 0; j < n; j++) {
                matrix[i][j] /= pivot;
                iden[i][j] /= pivot;
            }

            for (let j = 0; j < n; j++) {
                if (j !== i) {
                    const factor = matrix[j][i];
                    for (let k = 0; k < n; k++) {
                        matrix[j][k] -= factor * matrix[i][k];
                        iden[j][k] -= factor * iden[i][k];
                    }
                }
            }
        }
        return iden;
    }

    return (
        <div>

         <center><h2>Matrix Inversion</h2></center>

            <div  className='inputmx'>
            <label>
                <TextField  label="Enter Matrix:"
                    type="number"
                    value={size}
                    onChange={e => {
                        const newSize = Math.max(2, e.target.value);
                        setSize(newSize);
                        initializeMatrix(newSize);
                    }}
                />
            </label>
            </div>

            <div className='inputmx'>
                <div>
                <center><h3>Enter Matrix Values:</h3></center>  
                </div>
                {matrix.map((row, i) => (
                    <div key={i}>
                        {row.map((cell, j) => (
                            <TextField  label=""
                                key={j}
                                value={matrix[i][j]}
                                onChange={(e) => handleChange(e, i, j)}
                            />
                        ))}
                    </div>
                ))}
            </div>

            <div  className='camx'>
              <Button variant="contained" onClick={() => setInverseMatrix(invertMatrix(JSON.parse(JSON.stringify(matrix))))}>Solve</Button>
            </div>
           
            {inverseMatrix && (
                <div className='inputmx'>
                    <center><h3>Inverse Matrix</h3></center>
                    {inverseMatrix.map((row, i) => (
                        <div key={i}>
                            {row.map((cell, j) => (
                                <TextField  label=""
                                    key={j}
                                    value={inverseMatrix[i][j].toFixed(4)}
                                    readOnly
                                />
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MatrixInverter;