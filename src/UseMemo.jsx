import React,{Component, useState,useMemo,memo, useCallback} from 'react'
import './App.css';

const Counter = memo(function Counter(props){
    console.log('Counter render')
    return (
        <h1 onClick={props.onClick}>{props.count}</h1>
    )
})

function App(props) {
  const [count,setCount] = useState(0);
  const [clickCount,setClickCount] = useState(0);

    //传入空数组，之运行一次，在渲染期间完成    
  const double = useMemo(()=>{
      return count*2
  },[count===3])

  //声明一个以来于mome的变量
//   const half = useMemo(()=>{
//     return double/4;
//   },[double])

//APP重渲染后，onClick句柄的变化导致Counter也被连带着重新渲染了
//添加Usememo使onclick句柄不重新变化
// const onClick = useMemo(()=>{
//     return ()=>{
//         console.log('Click')
//     }
// },[])

// const onClick = useCallback(()=>{
//         console.log('Click')
// },[])
const onClick = useCallback(()=>{
    console.log('Click')
    setClickCount((clickCount)=>clickCount+1)
},[])
  return (
    <div>
    <button type="button" onClick={()=>{setCount(count+1)}}>
      click{count},double:({double})
    </button>
        <Counter count={double} onClick={onClick}></Counter>
    </div>
  );
}

export default App;

// ContextType作为类静态成员，不能在函数里用
