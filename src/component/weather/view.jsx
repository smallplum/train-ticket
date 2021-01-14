const Weather = ({status,cityName,weather,lowestTemp,highestTemp})=>{
    switch (status) {
        case status.LOADING: {
            return <div>天气信息请求中……</div>
        }
        case status.SUCCESS: {
            return <div>
                {cityName}{weather}最低气温{lowestTemp} 最高气温{highestTemp}
            </div>
        }
        case status.FAILURE: {
            return <div>天气信息请求失败</div>
        }
        default:{
            throw new Error('unexpected status'+status)
        }
    }
}

const mapStateTopProps = (state)=>{
    const weatherData = state.weather;

    return {
        status:weatherData.status,
        cityName:weatherData.city,
        weather:weatherData.weather,
        lowestTemp:weatherData.temp1,
        highestTemp:weatherData.temp2,
    }
}