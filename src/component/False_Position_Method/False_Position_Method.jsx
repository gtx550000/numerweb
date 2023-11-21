import React, {  useEffect,Component } from 'react';
import { db } from "../config/firebase";
import { getDocs,collection,addDoc} from "firebase/firestore";
import { Button, TextField } from '@mui/material';

class FalsePositionMethod extends Component {
  constructor() {
    super();
    this.state = {
      a: 0, // Initial lower bound
      b: 1, // Initial upper bound
      ans: 1,
      root: 1,
      tolerance: 0.00001, // Tolerance for stopping criterion
      maxIterations: 100, // Maximum number of iterations
      result: null, // The approximate root
    };
    
  }
  
  
  
  calculateRoot = () => {
   
    const falseCollection = collection(db,"falsepoint");

    useEffect(() =>{
      const getbisection= async() =>{
        try{
          const data = await getDocs(falseCollection);
          const filteredData = data.docs.map((doc) => ({...doc.data(),id: doc.id,}));
          setDataFunction(()=>{
            const a = filteredData.map((data)=>data.a); // name_field
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
  

    let { a, b, ans, root, tolerance, maxIterations } = this.state;
    let fa, fb, c, fc;

    for (let i = 0; i < maxIterations; i++) {
      fa = this.functionToSolve(a);
      fb = this.functionToSolve(b);
      c = (a * fb - b * fa) / (fb - fa);
      fc = this.functionToSolve(c);

      if (Math.abs(fc) < tolerance) {
        this.setState({ result: c });
        return;
      }

      if (fc * fa < 0) {
        b = c;
      } else {
        a = c;
      }
    }
    
    try{
      addDoc(falseCollection,{a:a});
      console.log("ok");
      }catch (e){
        console.error(e);
      }
    

    // If maxIterations is reached without converging, display an error
    this.setState({ result: 'No convergence after max iterations' });
  };

  functionToSolve = (x) => {
    // Replace this with the actual function you want to solve
    // For example, if you want to find the root of f(x) = x^2 - 4:
    return Math.pow(this.state.ans,1/this.state.root)-x;
    
  };

  render() {
    const { a, b,ans,root, tolerance, maxIterations, result } = this.state;
    
    return (
      <div>
        <center><h2>False Position Method</h2></center>

        <div className='a'>
          <label></label>
          <TextField  label="Initial Lower Bound (A):"
            type="number"
            value={a}
            onChange={(e) => this.setState({ a: parseFloat(e.target.value) })}
          />
        </div>

        <div className='b'>
          <label></label>
          <TextField  label="Initial Lower Bound (B):"
            type="number"
            value={b}
            onChange={(e) => this.setState({ b: parseFloat(e.target.value) })}
          />
        </div>

        <div className='ans'>
          <label></label>
          <TextField  label="Propostiton"
            type="number"
            value={ans}
            onChange={(e) => this.setState({ ans: parseFloat(e.target.value) })}
          />
        </div>

        <div className='fixroot'>
          <label></label>
          <TextField  label="Root"
            type="number"
            value={root}
            min="1"
            onChange={(e) => this.setState({ root: parseFloat(e.target.value) })}
          />
        </div>

        <div  className='fixerrorpoint'>
          <label></label>
          <TextField  label="Tolerance"
            type="number"
            value={tolerance}
            onChange={(e) => this.setState({ tolerance: parseFloat(e.target.value) })}
          />
        </div>

        <div className='maxti'>
          <label></label>
          <TextField  label="Max Iterations:"
            type="number"
            value={maxIterations}
            onChange={(e) => this.setState({ maxIterations: parseInt(e.target.value) })}
          />
        </div>

        <div  className='totalroot'>
         <Button variant="contained" onClick={this.calculateRoot}>Calculate Root</Button>
        </div>

        <div  className='ansroot'> 
          <h3><strong>Approximate Root:</strong> {result}</h3>
        </div>

      </div>
    );
  }
}

export default FalsePositionMethod;