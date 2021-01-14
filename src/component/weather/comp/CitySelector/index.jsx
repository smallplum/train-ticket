import React, { PureComponent } from 'react';
import * as weatherActions from '../../actions'
const CITY_CODES = {
    '北京':101010100,
    '上海':101020100,
    '广州':101280101,
    '深圳':101280601
}

class index extends PureComponent {
    // 为了防止用户选择城市请求的数据和对应借口返回的不符，最好的办法是在
    // 发出API请求时，将之前的API请求全部中止作废，这样保证了获得有效结果是用户的最后一次选择结果。
    // 在jquery中，可以通过abort方法取消掉一个AJAX请求
    // const xhr = $.ajax(...);
    // xhr.abort();
    // fetch返回的是一个Promise对象，在ES6的标准中，Promise对象不存在中断的概念
    // 既然fetch不能帮助我们中止api请求，就只能在应用层实现‘中断’效果，修改action构造函数
    componentDidMount(){
        const defaultCity = Object.keys(CITY_CODES)[0];
        this.props.onSelectCity(CITY_CODES[defaultCity])
    }
    onChange=(ev)=>{
        const cityCode = ev.target.value;
        this.props.onSelectCIty(cityCode)
    }
    render() {
        return (
            <select onChange={this.onChange}>
                {
                    Object.keys(CITY_CODES).map(
                        cityName=>
                        <option 
                            key={cityName}
                            value={CITY_CODES[cityName]}
                        >
                            {cityName}
                        </option>
                    )
                }
            </select>
        );
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        onSelectCIty:(cityCode)=>{
            dispatch(weatherActions.fetchWeather(cityCode))
        }
    }
}
export default index;