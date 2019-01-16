import React from 'react';
import ReactDOM from 'react-dom';

import './Weather.css'

export default class Weather extends React.Component
{
    // props.showWeatherTip
    // props.showWeatherCityandtext
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        $.getScript("http://api.map.baidu.com/location/ip?ak=hjEkP8rYRyLfjVMX6hO1KdLRdTLWGwAe&callback=showLocation");
    }

    render()
    {
        return (
            <div className="d-flex justify-content-center w-100 h-100 weather">
                <div className="elements weather-left">
                    <div className="weather-temperature">
                    </div>
                    <div class="weather-wind-power">
                    </div>
                    {
                        this.props.showWeatherTip == true &&
                        <div className="weather-tip"></div>
                    }
                </div>
                <div className="elements weather-right">
                    <div className="weather-icon">
                        <img src="" />
                    </div>
                    {
                        this.props.showWeatherCityandtext == true &&
                        <div className="weather-cityandtext">
                            <span className="weather-city"></span>：<span className="weather-text"></span>
                        </div>
                    }
                </div>
            </div>
        );
    }
}