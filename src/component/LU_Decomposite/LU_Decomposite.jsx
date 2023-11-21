import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';


function LU(){
    const [matrixSize, setMatrixSize] = useState(2)
    const [matrixData, setMatrixData] = useState(Array(2).fill(Array(2+1).fill('')));
    const [outputData, setOutputData] = useState([])
    const [X,setX] = useState([])

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
        for (let j = 0; j <= matrixSize; j++) {
          rowInputs.push(
            <TextField  label=""
              required
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

    function LUcal(){
      let A = [...matrixData];
      let B = []
      let L = [], U = [];
      let sum = 0,kon=1;

      for (let i = 0; i < matrixSize; i++) {
          // ใส่ 0 ลงใน L และ U โดยใช้ array ที่สร้างขึ้นใหม่ทุกครั้ง
          B.push(A[i][matrixSize]) 
          L.push(Array(matrixSize).fill(0));
          U.push(Array(matrixSize).fill(0));
      }
      console.log("B:", B);
      console.log("Matrix A:", A);
      console.log("Vector L:", L);
      console.log("Matrix U before setting U:", JSON.parse(JSON.stringify(U)));

      // set 1 0 in U
      for(let i = 0; i < matrixSize; i++) {  
          U[i][i] = 1;
      }
      console.log("Matrix U after setting:", U);

      let divideL,divideU;
      for(let i = 0; i < matrixSize; i++) {
        for(let j = 0; j < matrixSize; j++) {
             if(i>=j)//L
             {
              sum = 0;
              for(let k =0;k<matrixSize;k++)
              {
                if(k==j)
					      {
                  divideU = U[k][j];
                }
                else{
                  kon=0;
                  kon=L[i][k]*U[k][j];
                  sum=sum+kon;
                }
              }
                L[i][j] = (A[i][j]-sum)/divideU;
             }
            else//U
            {
              sum=0;
              for(let k=0;k<matrixSize;k++)
              {
                if(k==i)
                {
                  divideL = L[i][k];
                }
                else
                {	
                  kon=0;
                  kon=L[i][k]*U[k][j];
                  sum=sum+kon;
                }
                U[i][j] = (A[i][j]-sum)/divideL;
              }
            }
          }
      }//end set L U
      console.log("Matrix U after setting:", U);
      console.log("Matrix U after setting:", L);
      let Y=[]
      Y.push(Array(matrixSize).fill(0));
      for(let i = 0; i < matrixSize; i++) {
        sum = 0;
        for(let k = 0; k < i; k++) {  // ปรับเงื่อนไขที่นี่
            sum += L[i][k] * Y[k];
        }
        Y[i] = (B[i] - sum) / L[i][i];  // ปรับเงื่อนไขที่นี่
    }
      console.log("Y:", Y);

      for(let i=0;i<matrixSize;i++)
      {
        U[i][matrixSize] = Y[i]; 
      }

      for(let i=matrixSize-1;i>=0;i--)
      {	
        for(let tad=i-1;tad>=0;tad--)
        {	
          let nt =U[tad][i];
          for(let j=matrixSize;j>=0;j--)
          {
            U[tad][j] = U[tad][j]-(U[i][j]*nt);							
          }
        }	
      }
      console.log("U:", U);
      let x = []
      for(let i=0;i<matrixSize;i++)
      {
         x.push(U[i][matrixSize])
      }
      console.log("X:", x);
      setX(x)
  }

    const handleSaveData = () => {
      setOutputData(matrixData);
      LUcal();
    };

    return (
      <div>
         <center><h1>LU decomposition</h1></center>

        <div className='inputmx'>
          <label>
            <TextField  label="Enter Matrix: nxn" type="number" min="1" value={matrixSize}
              onChange={(e) => {const newSize = parseInt(e.target.value);
                setMatrixSize(newSize);
                setMatrixData(Array(newSize).fill(Array(newSize + 1).fill(''))) // ปรับขนาดของ matrixData ให้เป็น n x n+1
                setOutputData([]);
              }}
            />
          </label>
        </div>

       <div>
       <center><h3>Enter Matrix Values:</h3></center>
       </div>

        <div className='camx' style={{marginTop: '20px'}}>
          {renderMatrixInputs()}
        </div>

        <div  className='camx'>
         <Button variant="contained" onClick={handleSaveData}>Calculate</Button>
        </div>

        <div className='inputmx'>
         <h3>{X.map((LOVEB, index) => {return <div key={index}>X{index} = {LOVEB}</div>  })}</h3> 
        </div>
   

      </div>
    );
}

export default LU;