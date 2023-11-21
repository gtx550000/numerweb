import React, { useEffect,useState } from 'react';
import { Button, TextField } from '@mui/material';

function Lagrange() 
{
   const [matrixSize, setMatrixSize] = useState(2)
    const [matrixData, setMatrixData] = useState(Array(2).fill(Array(2).fill('')));
    const [outputData, setOutputData] = useState([])
    const [pointsize, setpointsize] = useState(1)
    const [pointdata, setpointdata] = useState([]);
    const [Fx, setFx] = useState(0)
    const [Y,setY] = useState()

    const handleMatrixChange = (row, col, value) => {
      const newMatrixData = matrixData.map((rowArray, rowIndex) =>
        rowIndex === row
          ? rowArray.map((cell, colIndex) =>
              colIndex === col ? value : cell
            )
          : rowArray
      );
      setMatrixData(newMatrixData);
    };

    const renderMatrixInputs = () => {
      const inputs = [];
      for (let i = 0; i < matrixSize; i++) {
        const rowInputs = [];
        for (let j = 0; j < 2; j++) {
          rowInputs.push(
            <input
              key={`${i}-${j}`}
              type="number"
              value={matrixData[i][j]}
              onChange={(e) => handleMatrixChange(i, j, e.target.value)}
            />
          );
        }
        inputs.push(<div key={i}>{rowInputs}</div>);
      }
      return inputs;
    };
//--------------------------------------------------------------------------------------------
    
      const renderMatrixInputspoint = () => {
        const inputs = [];
        for (let i = 0; i < pointsize; i++) {
            inputs.push(
                <div key={i}>
                    <input
                        required
                        type="number"
                        value={pointdata[i] || ''}
                        onChange={(e) => {
                            const newPointData = [...pointdata];
                            newPointData[i] = e.target.value;
                            setpointdata(newPointData);
                        }}
                    />
                </div>
            );
        }
        return inputs;
    };

    const handleSaveData = () => {
        setOutputData(matrixData);
        calLagrange()
      };
      
      function calLagrange(){
        let arrA = [...matrixData], arrnew = Array(pointsize).fill([0, 0]), arrL = Array(pointsize).fill(0);
        let x = parseFloat(Fx), y = 0;
        let i = 0, j, multiply, divide;
        
        for(i = 0; i < pointsize; i++){   // copy to arrnew
            let pointIndex = pointdata[i] - 1;  // since your pointdata starts from 1, not 0
            arrnew[i] = [...arrA[pointIndex]];
        }
        
        for(i = 0; i < pointsize; i++){   // find L
            multiply = 1;
            divide = 1;
            for(j = 0; j < pointsize; j++){
                if(i !== j){
                    multiply *= (x - arrnew[j][0]);
                    divide *= (arrnew[i][0] - arrnew[j][0]);
                }
            }
            arrL[i] = multiply / divide;
        }
        
        for(i = 0; i < pointsize; i++){   // find y
            y += arrL[i] * arrnew[i][1];
        }
        console.log(y);
        setY(y)  // you might want to return y so you can use it elsewhere
    }
    
    return (
        <div>

         <center><h1>Lagrange</h1></center>   

            <div className='a'> 
                <label></label>
                <TextField  label="Fx"type="number"value={Fx} onChange={(e) => {setFx(e.target.value)}}/>
            </div>

            <div className='b'>
                <label></label>
                    <TextField  label="X" type="number" min="1" value={matrixSize}
                    onChange={(e) => {
                        const newSize = parseInt(e.target.value);
                        setMatrixSize(newSize);
                        setMatrixData(Array(newSize).fill(Array(2).fill(''))); // ปรับขนาดของ matrixData ให้เป็น n x n+1
                        setOutputData([]);
                    }}
                    />
                
            </div>

            <div style={{marginTop: '20px'}}>
          {renderMatrixInputs()}
        </div>
        
         <div className=''>
                <label>
                Total Point : 
                    <input 
                    type="number"
                    min="1"
                    value={pointsize}
                    onChange={(e) => {
                        const newSize = parseInt(e.target.value);
                        setpointsize(newSize);
                        pointdata(Array(newSize).fill(Array(2).fill(''))); // ปรับขนาดของ matrixData ให้เป็น n x n+1
                        pointdata([]);
                    }}
                    />
                    <button onClick={handleSaveData}>Calculate</button>
                </label>
            </div>

            <div style={{marginTop: '20px'}}>
          {renderMatrixInputspoint()}
        </div>

        <div>
        <h3>{Y}</h3>
        </div>
        
        </div>
    );

}
export default Lagrange;