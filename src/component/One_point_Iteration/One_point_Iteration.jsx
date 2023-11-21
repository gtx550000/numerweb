import React, { useEffect,useState } from 'react';
import Show_graph from '../ShadowGraph/ShadowGraph';
import { db } from "../config/firebase";
import { getDocs,collection,addDoc} from "firebase/firestore";
import { pow,sqrt } from 'mathjs';
import { Button, TextField } from '@mui/material';

function OnePointIteration() {
  const [initialGuess, setInitialGuess] = useState(0);
  const [tolerance, setTolerance] = useState(0.0001);
  const [ans, setans] = useState(0);
  const [func, setFunc] = useState(0);
  const [result, setResult] = useState(null);
  const [xe,setXe] = useState(0);
  const [newonepoint,setnewonepoint] = useState("");
  const g = (x) => eval(func); // Define the function here

  const OnepointCollection = collection(db,"Onepoint");

  useEffect(() =>{
    const getonepoint= async() =>{
      try{
        const data = await getDocs(OnepointCollection);
        const filteredData = data.docs.map((doc) => ({...doc.data(),id: doc.id,}));
        setDataFunction(()=>{
          const a = filteredData.map((data)=>data.getans); // name_field
          seta(a[0]);
          return a;
        });
        setDataFunction(()=>{
          const b = filteredData.map((data)=>data.getstart); // name_field
          setb(b[0]);
          return b;
        });
        console.log(filteredData);
      }catch(e){
        console.error(e);
      };
    
    };
    getonepoint();
 },[]);




  const calculateRoot = () => {
    setFunc(ans);
    let x0 = initialGuess;
    let x1 = g(x0);
    let iteration = 0;
    let max = 100000000;
    console.log(x1);

    try{
      addDoc(OnepointCollection,{getans:ans,gestart:initialGuess});
      console.log("ok");
      }catch (e){
        console.error(e);
      }
    
    while (Math.abs(x1 - x0) >= tolerance) {
      
      x0 = x1;
      x1 = g(x0);
      iteration++;
      if(iteration >= max){
        break;
      }
    }
    if(iteration >= max){
      setResult(`It max iteration`);
    }else{
      setResult(`Root: ${x1} (found in ${iteration} iterations)`);
      setXe(x1);
    }

    
  }

  return (
    <div>
      <div>
      <center><h1>One point</h1></center>
      </div>

      <div className='b'>
        <label htmlFor="initialGuess"></label>
        <TextField label="Initial Guess:" type="number" id="initialGuess" value={initialGuess} onChange={(e) => setInitialGuess(parseFloat(e.target.value))} />
      </div>   
         
     
      <div className='ans'>
         <label htmlFor="ans"></label>
         <TextField label="Propostiton" type="text" id="ans"  value={ans}  onChange={(e) => setans(e.target.value)} /> 
      </div>
    
      <div className='errorpoint'>
        <label htmlFor="tolerance"></label>
        <TextField label="Tolerance" type="number" id="tolerance" value={tolerance}onChange={(e) => setTolerance(parseFloat(e.target.value))}/>
      </div>
      
      <div className='ca'>
        <Button variant="contained"  onClick={calculateRoot}>Calculate Root</Button>
      </div>

      <div className='fixan'>
        <div>{result}</div>
      </div>

      <div className='showg'>
        <div className='fixshowg'>
         <Show_graph func={func} x={xe} y={g(xe)}/>
        </div>
      </div>
    </div>
  );
}

export default OnePointIteration;