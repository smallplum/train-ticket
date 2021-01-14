import {FETCH_STARTED,FETCH_SUCCESS,FETCH_FAILURE} from './actionTypes.js';

//三个普通的action构造函数各自返回一个有特定type字段的普通对象，他们的作用是驱动reducer函数去改变redux store上weather字段的状态。
export const fetchWeatherStarted = ()=>({
    type:FETCH_STARTED
});
export const fetchWeatherSuccess = (result)=>({
    type:FETCH_SUCCESS,
    result
});
export const fetchWeatherFailure = (error)=>({
    type:FETCH_FAILURE,
    error
});

//关键是接下来的异步action构造函数fetchWeather
// 在action构造函数文件中定义一个文件模块级的nextSeqId变量，
// 这是一个递增的整数数字，给每一个访问API的请求做序列编号。
// 在fetchWeather返回的函数中，fetch开始一个异步请求之前，
// 先给nextSeqId自增加一，然后自增的结果赋值给一个局部变量
// seqId，这个seqId的值就是这一次异步请求的编号，如果随后还
// 有fetchWeather构造器被调用，那么nextSeqId也会自增，
// 新的异步请求会分配为新的seqId。然后，action构造函数中所
// 有的dispatch函数都被替换为一个新定义的函数dispatchIf-Valid，
// 这个dispatchIfValid函数要检查一下当前环境的seqId是否等同于
// 全局的nextSeqId。如果相同，说明fetchWeather没有被再次调用
// ，就继续使用dispatch函数。如果不相同，说明这期间有新
// 的fetchWeather被调用，也就是有新的访问服务器的请求被发出去了
// ，这时候当前seqId代表的请求就已经过时了，直接丢弃掉，不需要
// dispatch任何action。虽然不能真正“中止”一个API请求，但是
// 我们可以用这种方法让一个API请求的结果被忽略，达到了中止一个
// API请求一样的效果。在这个例子中Weather模块只有一种API请求，
// 所以一个API调用编号序列就足够，如果需要多种API请求，则需要更
// 多类似nextSeqId的变量来存储调用编号。
// let a11 = 0;
// const b11 = ++a11;
// const c11 = ++a11;
// console.log(a11,b11,c11)
// 2,1,2

let nextSeqId = 0;
export const fetchWeather = (cityCode)=>{
    return (dispatch)=>{
        const apiUrl = `/data/cityinfo/${cityCode}.html`;
        const seqId = ++nextSeqId;
        const dispatchIfValid = (action) =>{
            if(seqId===nextSeqId){
                return dispatch(action)
            }
        }

        dispatchIfValid(fetchWeatherStarted());

        fetch(apiUrl).then((response)=>{
            if(response.status!==200){
                throw new Error ('Fail to get response with status'+response.status);
            }

            response.json().then((responseJson)=>{
                dispatchIfValid(fetchWeatherSuccess(responseJson.weatherinfo));
            }).catch((error)=>{
                dispatchIfValid(fetchWeatherFailure(error))
                throw new Error('Invalid json response:'+error)
            });
        }).catch((error)=>{
            dispatchIfValid(fetchWeatherFailure(error))
        })
    }
}

//异步action构造函数的模式就是函数体内返回一个新的函数，这个新的函数可以有两个参数
// dispatch和getState，分别代表Redux唯一的Store上的成员函数dispatch和getState
// 这两个参数的传入是redux-thunk中间件的工作，终于redux-thunk如何实现这个功能，之后再详细介绍
// 异步action构造函数的代码基本上都是这样的套路

export const sampleAsyncAction=()=>{
    return (dispatch,getState)=>{
        //在这个函数里可以调用异步函数，自行决定在合适的时机通过dispatch参数
        //派发出新的action对象。
    }
}