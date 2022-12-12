
import React from 'react';
import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_KEY,WEATHER_API_URL } from './components/api';
import { useEffect, useState } from 'react';


function App() {


  const [currentWeather,setCurrentWeather] = useState(null);
  const [forcast, setForcast] = useState(null);

  useEffect(() => {
    const currentWeatherDefault = fetch(`${WEATHER_API_URL}/weather?q=tel-aviv&appid=${WEATHER_API_KEY}&units=metric`)
    Promise.all([currentWeatherDefault])
    .then(async (responses) => {
      const weatherResponses = await responses[0].json();
      setCurrentWeather({...weatherResponses})
    }).catch((err)=>console.log(err));
  },[0])


  const handleOnSearchChange = (searchData) => {
    
    const [lat , lon] = searchData.value.split(" ")
    //console.log(lat , lon);//32.0809 34.7806

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    const forcastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeatherFetch,forcastFetch])
    .then(async (response) => {
      const weatherResponse = await response[0].json();
      const forcastResponse = await response[1].json();
      setCurrentWeather({city: searchData.label,...weatherResponse});
      setForcast({city: searchData.label,...forcastResponse});

    })
    .catch((err)=>console.log(err));
  }

  function convertSunset(thisya)
  {   
      const dateObj = new Date(thisya * 1000);
      const utcString = dateObj.toUTCString();
      const time = utcString.slice(-12, -7);
      return time
  }

  function colorTime(){
    if(currentWeather == null){
      return 0
    }
    const date=Math.floor(new Date(new Date()).getTime() / 1000)
    const data={currentWeather}
    var sunrise =convertSunset(data.currentWeather.sys.sunrise + data.currentWeather.timezone)
    var sunset =convertSunset(data.currentWeather.sys.sunset + data.currentWeather.timezone)    
    var newdate=convertSunset(date + data.currentWeather.timezone)

    var minsToAdd = 30;
    var minsToSub =-30;

    var time = sunrise;
    var addTime = new Date(new Date("1970/01/01 " + time).getTime() + minsToAdd * 60000).toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit', hour12: false });
    var subTime = new Date(new Date("1970/01/01 " + time).getTime() + minsToSub * 60000).toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit', hour12: false });

    if((addTime >= newdate) && (newdate >= subTime))
    {
      return 'sunrise'
    }

    var time = sunset;
    var addTime = new Date(new Date("1970/01/01 " + time).getTime() + minsToAdd * 60000).toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit', hour12: false });
    var subTime = new Date(new Date("1970/01/01 " + time).getTime() + minsToSub * 60000).toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit', hour12: false });
    //fix the length of the ifs and it will work

    if((addTime >= newdate) && (newdate >= subTime))
    {
      return 'sunset'
    }


    if (sunrise <= newdate && newdate <= sunset)
    {
    return 'day'} 
    else{
    return 'night'}

  }



  return (
    <div className={colorTime()}>
      <div className="container">
        <Search onSearchChange={handleOnSearchChange}/>
        <div className='weather'>
          {currentWeather && <CurrentWeather data={currentWeather}/>}
        </div>
      </div>  
    </div>
  );
}

export default App;
{/* <Search onSearchChange={handleOnSearchChange}/> */}