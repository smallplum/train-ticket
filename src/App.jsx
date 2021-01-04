import React,{Component, useState,useEffect} from 'react'
import './App.css';

class App2 extends Component{
  state = {
    count:0,
    size:{
      width:document.documentElement.clientWidth,
      height:document.documentElement.clientHeight,
    }
  }
  onResize=()=>{
    this.setState({
      size:{
        width:document.documentElement.clientWidth,
        height:document.documentElement.clientHeight,
      }
    })
  }
  componentDidMount(){
    document.title = this.state.count;
    window.addEventListener('resize',this.onResize);
  }
  componentWillUnmount(){
    window.removeEventListener('resize',this.onResize);
  }
  componentDidUpdate(){
    document.title = this.state.count;
  }
  render(){
    const {count,size} = this.state;
    return (
      <button type="button" onClick={()=>{this.setState({count:count+1})}}>
        click{count}
        size:{size.width}*{size.height}
      </button>
    );
  }
}

function App(props) {
  // const [count,setCount] = useState(()=>{
  //   //提供一个函数，提高初始效率
  //   return props.defaultCount||0
  // });
  const [count,setCount] = useState(0);
  //useEffect统一在渲染后调用
  useEffect(()=>{
    document.title = count;
  })
  return (
    <button type="button" onClick={()=>{setCount(count+1)}}>
      click{count}
    </button>
  );
}

export default App;
