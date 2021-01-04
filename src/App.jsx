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
  const [size,setSize] = useState({
    width:document.documentElement.clientWidth,
    height:document.documentElement.clientHeight,
  })
  const onResize = ()=>{
    setSize({
      width:document.documentElement.clientWidth,
      height:document.documentElement.clientHeight,
    })
  }
  useEffect(()=>{
    console.log('count',count)
  },[count])
  //useEffect统一在渲染后调用
  useEffect(()=>{   //didmount，didupdate
    document.title = count;
  })

  //每次渲染后都运行，加一个【】，绑定的函数只会发生在第一次渲染后，并且在组件卸载之前才会运行绑定函数
  useEffect(()=>{    //didmount，willUnmount
    window.addEventListener('resize',onResize);
    return ()=>{
      window.removeEventListener('resize',onResize);
    }
  },[])

  const onClick=()=>{
    console.log('click');
  }
  useEffect(()=>{  
    document.querySelector('#size').addEventListener('click',onClick,false)
    return ()=>{  //清理状态，获取最新状态
      document.querySelector('#size').removeEventListener('click',onClick,false)
    }
  })

  return (
    <>
    <button type="button" onClick={()=>{setCount(count+1)}}>
      click{count}
    </button>
    {
      count%2?
      <span id="size">size:{size.width}*{size.height}</span>:
    <p id="size">size:{size.width}*{size.height}</p>
    }
    
    </>
  );
}

export default App;


//在使用useEffext处理title和size的时候，写了两个useEffect，不同的逻辑做不同的事情，这就是关注点分离
// 1、提高了组件复用
// 2、优化了关注点分离
// 两个函数的区别在于第二个参数，空数组，是精髓，只有数组的每一项都不变，所以只有第一次被渲染的时候才会被调用