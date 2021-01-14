import React, { PureComponent } from 'react';
import * as weatherActions from '../../actions'
const CITY_CODES = {
    '北京':101010100,
    '上海':101020100,
    '广州':101280101,
    '深圳':101280601
}

class index extends PureComponent {
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