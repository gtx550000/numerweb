import React, { useEffect,useState } from 'react';
import Show_graph from '../ShadowGraph/ShadowGraph';
import { db } from "../config/firebase";
import { getDocs,collection,addDoc} from "firebase/firestore";
import { pow,sqrt } from 'mathjs';
import { Button, TextField } from '@mui/material';


  function Bisection() {
    const [a, setA] = useState(0);
    const [b, setB] = useState(1);
    const [ans, setans] = useState("pow(7,0.5)-x");
    const [tolerance, setTolerance] = useState(0.0001);
    const [result, setResult] = useState(null);
    const [val, setval] = useState("pow(7,0.5)-x");
    const [x,setX] = useState(0);
    const [y,setY] = useState(0);
    const f = (x) => eval(ans); // Define the function here
    const BisectionCollection = collection(db,"Bisection");
  
    useEffect(() =>{
      const getbisection= async() =>{
        try{
          const data = await getDocs(BisectionCollection);
          const filteredData = data.docs.map((doc) => ({...doc.data(),id: doc.id,}));
          setDataFunction(()=>{
            const ans = filteredData.map((data)=>data.getAns); // name_field
            setans(ans[0]);
            return ans;
          });
          setDataFunction(()=>{
            const a = filteredData.map((data)=>data.getA); // name_field
            setA(a[0]);
            return a;
          });
  
          setDataFunction(()=>{
            const b = filteredData.map((data)=>data.getB); // name_field
            setB(b[0]);
            return b;
          });
  
          console.log(filteredData);
        }catch(e){
          console.error(e);
        };
  
      };
      getbisection();
   },[]);
  
  
    const calculateRoot = () => {
      let a = parseFloat(document.getElementById("a").value);
      let b = parseFloat(document.getElementById("b").value);
      let ae = b;
      let be = a;
      let ans =(document.getElementById("ans").value);
      let tolerance = parseFloat(document.getElementById("tolerance").value);
      let fa = f(a);
      let fb = f(b);
      let c;
      let fc;
      let iteration = 0;

      try{
        addDoc(BisectionCollection,{getA:a,getAns:ans,getB:b});    
        console.log("ok");
        console.log(a);
        console.log(b);
        console.log(ans);
        }catch (e){
          console.error(e);
      }

  
      while ((be - ae) >= tolerance) {
        c = (ae + be) / 2;
        fc = f(c);
  
        if (fc === 0.0) {
          break;
        } else if (fa * fc < 0) {
          be = c;
          fb = fc;
        } else {
          ae = c;
          fa = fc;
        }
  
        iteration++;
      }
  
      setY(f(c));
      setX(c);
      setval(ans);
      setResult(`Root: ${c} (found in ${iteration} iterations)`);
      
    }
  
    return (
      <div>
         <center><h1>Biscetion</h1></center>

      <div className='a'>
        <label htmlFor="a"></label>
        <TextField  label="A" type="number" id="a" value={a} onChange={(e) => setA(parseFloat(e.target.value))} />
      </div>

      <div className='b'>
        <label htmlFor="b"></label>
        <TextField  label="B" type="number" id="b" value={b} onChange={(e) => setB(parseFloat(e.target.value))} />
      </div>

      <div className='ans'>
        <label htmlFor="ans"></label>
        <TextField  label="Propostiton" type="text" id="ans" value={ans} onChange={(e) => setans(e.target.value)} />
      </div>
      
      <div className='errorpoint'>
        <label htmlFor="tolerance"></label>
        <TextField  label="tolerance" type="number" id="tolerance" value={tolerance} onChange={(e) => setTolerance(parseFloat(e.target.value))} />
      </div>

      <div className='ca'>
      <Button variant="contained" onClick={calculateRoot}>Calculate Root</Button>
      </div>
      
      <div className='fixan'>
      <div className='root'>{result}</div>
      </div>

     <div className='fixshowg'>
      <div className='showg'>
        <Show_graph func = {val} x = {x} y = {y}/>
      </div>
     </div>
    
    </div> 
  
    );
  }

  export default Bisection;