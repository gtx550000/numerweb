import React, { useEffect,useState } from 'react';
import { derivative, max } from 'mathjs'
import { pow,sqrt } from 'mathjs';
import Show_graph from '../ShadowGraph/ShadowGraph';
import { Button, TextField } from '@mui/material';
import { db } from "../config/firebase";
import { getDocs,collection,addDoc} from "firebase/firestore";

function NewtonRaphson() {
  const max_iteration = 100000;
  const [initialGuess, setInitialGuess] = useState(0);
  const [ans, setans] = useState('');
  const [func,setFunc] = useState('');
  const [tolerance, setTolerance] = useState(0.0001);
  const [result, setResult] = useState(null);
  const [x,setX] = useState(null);
  const [y,setY] = useState(null);
  const f = (x) => eval(ans); // Define the function here
  const fPrime = (x) => eval((derivative(ans,'x'))) ; // Define the derivative of the function here
  const newtonCollection = collection(db,"NewtonRaphson");

  useEffect(() =>{
    const getbisection= async() =>{
      try{
        const data = await getDocs(newtonCollection);
        const filteredData = data.docs.map((doc) => ({...doc.data(),id: doc.id,}));
        setDataFunction(()=>{
          const a = filteredData.map((data)=>data.problem); // name_field
          setans(a[0]);
          return a;
        });
        console.log(filteredData);
      }catch(e){
        console.error(e);
      };
    
    };
    getbisection();
 },[]);

  const calculateRoot = () => {
    let x0 = initialGuess;
    let iteration = 0;
    while (Math.abs(f(x0)) >= tolerance && iteration < max_iteration) {
      x0 = x0 - f(x0) / fPrime(x0);
      console.log("xo: "+x0);
      iteration++;
    }
    setX(x0);
    setY(f(x0));
    setFunc(ans);
    setResult(`Root: ${x0} (found in ${iteration} iterations)`);

    try{
      addDoc(newtonCollection,{problems:ans,geta:initialGuess});
      console.log("ok");
      }catch (e){
        console.error(e);
      }
  }
  

  return (
    <div>

      <center><h1>NewtonRaphson</h1></center> 

      <div  className='b'>
        <label htmlFor="initialGuess"></label>
        <TextField  label="Initial Guess:" type="number" id="initialGuess" value={initialGuess} onChange={(e) => setInitialGuess(parseFloat(e.target.value))} />
      </div>

      <div className='ans'>
        <label htmlFor="ans"></label>
        <TextField  label="Propostiton:"type="text" id="ans" value={ans}onChange={(e) => setans(e.target.value)} />
      </div>

      <div className='errorpoint'>
        <label htmlFor="tolerance"></label>
        <TextField  label="Tolerance" type="number"id="tolerance"value={tolerance}  onChange={(e) => setTolerance(parseFloat(e.target.value))} />
      </div>
     
      <div className='ca'>
        <Button variant="contained" onClick={calculateRoot}>Calculate Root</Button>
      </div>

      <div className='fixinputmx'>
        <div>{result}</div>
      </div>

      <div  className='fixshowg'>
        <div className='showg'>
         <Show_graph func = {func} x = {x} y = {y}/>
        </div>
      </div>

    </div>
  );
}
export default NewtonRaphson;