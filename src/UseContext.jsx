import React,{Component, useState,createContext,useContext} from 'react'
import './App.css';

const CountContext = createContext();

class Foo extends Component{
    render(){
        return (
            <CountContext.Consumer>
                {
                    count=><h1>Foo:{count}</h1>
                }
            </CountContext.Consumer>
        )
    }
}

class Bar extends Component{
    static contextType = CountContext;
    render(){
        const count = this.context;
        return (
            <h1>Bar:{count}</h1>
        )
    }
}

function Counter(){
    const count = useContext(CountContext);
    return (
        <h1>Counter:{count}</h1>
    )
}

function App(props) {
  const [count,setCount] = useState(0);
  return (
    <div>
    <button type="button" onClick={()=>{setCount(count+1)}}>
      click{count}
    </button>
    <CountContext.Provider value={count}>
        <Foo></Foo>
        <Bar></Bar>
        <Counter></Counter>
    </CountContext.Provider>
    </div>
  );
}

export default App;

// ContextType作为类静态成员，不能在函数里用
