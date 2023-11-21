import { useState ,useEffect} from "react";
import{pow,sqrt,diff, derivative} from"mathjs";
import Show_graph from '../ShadowGraph/ShadowGraph';
import { Mafs, Line, Coordinates, useMovablePoint } from "mafs"
import { db } from "../config/firebase";
import { getDocs,collection,addDoc} from "firebase/firestore";


function OrdinaryDifferential()
{
 const[ans,setans]=useState("pow(x,2)");
 const[fx,setfx]=useState(1);
 const[n,setn]=useState(2);
 const[val,setval]=useState("pow(x,2)");
 const[x,setx]=useState(0);
 const[y,sety]=useState(0);
 const[result,setresult]=useState(null);
 const [data, setData] = useState([]);

 const f =(x)=> eval(ans);
 const differentiaonCollection = collection(db,"differentiaon");

 useEffect(() => {
    const fetchData = async () => {
        const querySnapshot = await getDocs(differentiaonCollection);
        const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setData(data);
    };

    fetchData();
}, []);

const loadData = async () => {
  const querySnapshot = await getDocs(differentiaonCollection);
  const documents = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

  
  if (documents.length > 0) {
      const randomIndex = Math.floor(Math.random() * documents.length);
      const randomDocument = documents[randomIndex];
      setfx(randomDocument.x);
      setn(randomDocument.h);
      setans(randomDocument.ans);
      
  }
};

 const calculate = () => {


 let fx = parseFloat(document.getElementById("fx").value);
 let n = parseFloat(document.getElementById("n").value);
 let ans = document.getElementById("ans").value;
 addDoc(differentiaonCollection,{x:fx,ans:ans,h:n}); 
 let totaldiffa = derivative(ans,"x").evaluate({x:fx});
 let totaldiffb = derivative(ans,"x").evaluate({x:n});
 let totaldiffc = (totaldiffa-totaldiffb)/n;
 console.log(totaldiffa);
 console.log(totaldiffc);
 console.log(totaldiffb);
      
 



 setx(0);
 sety(totaldiffa);
 setval(totaldiffc);
 setresult(`ans: ${totaldiffa}`)
 }



return (
    <div>
 
    <center><h1>DIFFERENTIATION</h1></center>

   <div>
    <label htmlFor="fx">x input</label>
    <input type="number" id="fx" value={fx} onChange={(e)=>setfx(e.target.value)}/>
   </div>

   <div>
    <label htmlFor="n">h   input</label>
    <input type="number" id="n" value={n} onChange={(e)=>setn(e.target.value)}/>
   </div>

   <div>
    <label htmlFor="ans">ans input</label>
    <input type="text" id="ans" value={ans} onChange={(e)=>setans(e.target.value)}/>
   </div>

   <div>
    <button onClick={calculate}>calculate</button>
   </div>

   <div>
          <button onClick={loadData}>redom</button>
    </div>


   <div>
    {result}
   </div>

  

  <div>
  <Show_graph func={val} x={x} y={y}/>
  </div>

  
  
    </div>
);   





}
export default OrdinaryDifferential;
