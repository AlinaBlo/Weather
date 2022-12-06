import './current-weather.css';
import './weather-img/weatherImg.js';

import { WiSunrise,WiSunset,WiThermometer,WiHumidity,WiDirectionUp,WiDirectionDown,WiDegrees } from "react-icons/wi";
import { IconContext } from 'react-icons/lib';
import Weatherimg from './weather-img/weatherImg.js';

export default function CurrentWeather({data}){

function convertSunset(thisya)
{
    const dateObj = new Date(thisya * 1000);
    const utcString = dateObj.toUTCString();
    const time = utcString.slice(-13, -7);
    return time
}

function getTimeFromCity()
{
    const date=Math.floor(new Date(new Date()).getTime() / 1000)
    return convertSunset(date + data.timezone)
}

    return(
        <div>
            <div className='animation_cont'>
            <IconContext.Provider value={{ className: "react-icons" }}>
            <div className='weather_a'>
                <div className='toptop'>
                    <div className='top'>
                        <p className='city'>{data.name}</p>
                        <p className='city-time'>{getTimeFromCity()}</p>
                        <p className='weather-description'>{data.weather[0].description}</p>
                    </div>
                    <div className='weather_img'>
                        <Weatherimg data={data}/>
                    </div>
                </div>
                <div className='bottom'>
                    <p className='temperature'><WiThermometer/>{data.main.temp} °C</p>
                    <div className='details'>
                        
                        <div>
                            <p>Details:</p>
                            <p></p>
                            
                        </div>
                        <div>
                            <span>Feels like: </span>
                            <span>{data.main.feels_like} °C</span>
                        </div>
                        <div>
                            <span>Humidity: </span>
                            <span>{data.main.humidity} <WiHumidity /></span>
                        </div>
                        <div>
                            <span>Min temp: </span>
                            <span><WiDirectionDown/>{data.main.temp_min} °C</span>
                        </div>
                        <div>
                            <span>Max temp: </span>
                            <span><WiDirectionUp/>{data.main.temp_max} °C</span>
                        </div>
                        <div className='sun/set/rise'>
                            <span>Sunrise: </span>
                            <span>{convertSunset(data.sys.sunrise + data.timezone)} <WiSunrise /></span>
                            <br></br>
                            <span>Sunset: </span>
                            <span>{convertSunset(data.sys.sunset + data.timezone )} <WiSunset /></span>
                        </div>
                    </div>
                    
                </div>
            </div>
            </IconContext.Provider>
            </div>
        </div>

    )

}