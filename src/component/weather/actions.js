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
export const fetchWeather = (cityCode)=>{
    return (dispatch)=>{
        const apiUrl = `/data/cityinfo/${cityCode}.html`;

        dispatch(fetchWeatherStarted());

        fetch(apiUrl).then((response)=>{
            if(response.status!==200){
                throw new Error ('Fail to get response with status'+response.status);
            }

            response.json().then((responseJson)=>{
                dispatch(fetchWeatherSuccess(responseJson.weatherinfo));
            }).catch((error)=>{
                throw new Error('Invalid json response:'+error)
            });
        }).catch((error)=>{
            dispatch(fetchWeatherFailure(error))
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