import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

function DeterminantCalculator() {
  const [dimension, setDimension] = useState(2);
  const [matrix, setMatrix] = useState(Array.from({ length: dimension }, () => Array(dimension).fill(0)));
  const [answer,setAnswer] = useState([]);
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


  const calculate = () => {
    let ans = [];
    let x = [];
    let y = [];
   
    for(let i=0;i<dimension;i++){
      y.push(matrix[i][dimension]);
    }
    for(let i=0;i<dimension;i++){
      let array  = matrix[i];
      x.push(array);
      x[i].pop();
    }
    
    for(let k=0;k<dimension;k++){
      ans.push(determinant(setmatrix(x,y,k)));
    }
    setAnswer(ans);
  };
  function setmatrix(x,y,index){
    let ans = Array();
    for(let i=0;i<x.length;i++){
      let array = [];
      for(let k=0;k<x.length;k++){
        if(k==index){
          array.push(y[i]);
        }else{
          array.push(x[i][k]);
        }
      }ans.push(array);
    }
    return ans;
  }
  function determinant(matrix_ans){
    
    let final_ans = 0;
    let ansed = 1;
    let size = matrix_ans.length;
    if(size == 2){
      final_ans += ((matrix_ans[0][0]*matrix_ans[1][1])-(matrix_ans[1][0]*matrix_ans[0][1]));
    }else{
      for(let i=0;i< size;i++){
          for(let k=i;k< size+i;k++){
            ansed *= matrix_ans[k-i][k%size];
          }
        final_ans +=ansed;
        ansed = 1;
      }
      for(let i=0;i< size;i++){
          for(let k=i;k< size+i;k++){
            ansed *= matrix_ans[((size-1)-(k-i))%size][k%size];
          }
        final_ans -=ansed;
        ansed = 1;
      }
    }
    return final_ans;
  } 
  
  return (
    <div>
      <center><h2>CramerRule Calculator</h2></center>

      <div className='inputmx'>
        <TextField  label="Enter Matrix:" type="number" min="2" value={dimension} onChange={handleDimensionChange} />
      </div>

      <center><h3>Enter Matrix Values:</h3></center>

      <div className=''>
        {matrix.map((row, rowIndex) => (

          <div className='inputmx' key={rowIndex}>

            {row.map((value, colIndex) => (
              <TextField  label=""  key={colIndex}type="number"value={value} onChange={(e) => handleMatrixChange(e, rowIndex, colIndex)} />
            ))}
          </div>
        ))}

      </div>

      <div className='camx'>
        <Button variant="contained" onClick={calculate}>Calculate CramerRule</Button>
      </div>
      
      <div className='inputmx'>
      <h3>Values is: {answer.map((value,index) => (<t>x{index}:{value} &nbsp;</t>))}</h3>
      </div>

    </div>
  );
}

export default DeterminantCalculator;