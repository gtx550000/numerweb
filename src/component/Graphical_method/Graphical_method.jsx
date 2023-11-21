import "mafs/core.css";
import "mafs/font.css";
import { db } from "../config/firebase";
import { useEffect,useState } from "react";
import { getDocs,collection,addDoc} from "firebase/firestore";
import { Mafs, Coordinates, Plot, Theme } from "mafs";
import {pow, sqrt } from "mathjs";
import Show_graph from '../ShadowGraph/ShadowGraph';
import { Button, TextField } from '@mui/material';


export default function Graphical() {
  const [answer, setAnswer] = useState(1);
  const [equation, setEquation] = useState("");
  const [newgetgraphical,setnewgetgraphical]=useState("");

  const GraphicalCollection = collection(db,"Graphical");

  useEffect(() =>{
    const getgraphical = async() =>{
      try{
        const data = await getDocs(GraphicalCollection);
        const filteredData = data.docs.map((doc) => ({...doc.data(),id: doc.id,}));
        setDataFunction(()=>{
          const a = filteredData.map((data)=>data.getgaphical); // name_field
          setAnswer(a[0]);
          
          return a;
        });
        
        console.log(filteredData);
      }catch(e){
        console.error(e);
      };
    
    };
    getgraphical();
 },[]);


 const plot = async() => {
    try{
    await addDoc(GraphicalCollection,{getgaphical:answer});
    }catch (e){
      console.error(e);
    }
    setEquation(answer);
  };



  return (
    <div>
      
      <center><h1>Graphical</h1></center> 

      <div className="eq">
        <label htmlFor="answer"></label>
        <TextField  label="Equation: " type="text" id="answer" value={answer}onChange={(e) => setAnswer(e.target.value)} />
      </div>
      
      <div className="ca">
        <Button variant="contained" onClick={plot}>Plot</Button>
      </div>

      <div className="showg">
        <div className="fixshowg">
          <Show_graph func = {equation} x = {0} y = {0}/>
        </div>
      </div>

      
    </div>
  );
}