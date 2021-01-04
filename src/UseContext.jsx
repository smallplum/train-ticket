import React,{Component, useState} from 'react'
import './App.css';


function App(props) {
  const [count,setCount] = useState(0);
 
  return (
    <>
    <button type="button" onClick={()=>{setCount(count+1)}}>
      click{count}
    </button>
    </>
  );
}

export default App;
