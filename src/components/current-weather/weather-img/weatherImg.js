import React from 'react';
import './weatherImg.css';
import { useState,useEffect } from 'react';

export default function Weatherimg({data}){

    const [weather,setWeather] = useState('');

    useEffect(() => {
        async function selectTheDiv() {
            const tmp=data.weather[0].icon
            console.log(data.weather[0].icon);

            
            if ( tmp === "01d")
                {setWeather(()=>{return(<div><div className='sun' style={{top: -50,left:120 }}></div></div>)});}
            else if(tmp === "01n")
                {setWeather(()=>{return(<div><div className='moon' style={{top: -50,left:120 }}></div></div>)});}
            else if(tmp === "02d")
                {setWeather(()=>{return(<div><div className='sun'style={{top: -50,left:120 }}></div><div className="cloud"style={{top: -25,left:10 }}></div></div>)});}
            else if(tmp === "02n")
                {setWeather(()=>{return(<div><div className='moon'style={{top: -50,left:120 }}></div><div className="cloud"style={{top: -25,left:10 }}></div></div>)});}
            else if(tmp === "03n" || tmp === "03d")
                {setWeather(()=>{return(<div><div className="cloud"style={{top: 0,left:30 }}></div></div>)});}
            else if(tmp === "04n" || tmp === "04d")
                {setWeather(()=>{return(<div><div className="Dark_cloud"style={{top: 0,left:30 }}></div><div className="cloud"></div></div>)});}
            else if(tmp === "09n" || tmp === "09d")
                {setWeather(()=>{return(<div><div className="Dark_cloud"style={{top: 0,left:30 }}></div><div className="cloud"></div><div className='rain'></div></div>)});}
            else if(tmp === "10d")
                {setWeather(()=>{return(<div><div className='sun'style={{top: -50,left:120 }}></div><div className="cloud"style={{top: -25,left:10 }}></div><div className='rain' style={{left: 20,top:250 }}></div></div>)});}
            else if(tmp === "10n")
                 {setWeather(()=>{return(<div><div className='moon'style={{top: -50,left:120 }}></div><div className="cloud"style={{top: -25,left:10 }}></div><div className='rain' style={{left: 20,top:250 }}></div></div>)});}
            else if(tmp === "11n" || tmp === "11d")
                 {setWeather(()=>{return(<div><div className="Dark_cloud"style={{top: 15,left:50 }}></div><div className="cloud"style={{top: 10,left:30 }}></div><div className='Tunder'><div className='shape1'style={{top: 10,left:100 }}></div></div></div>)});}
            else if(tmp === "13n" || tmp === "13d")
                {setWeather(()=>{return(<div><div className="cloud" style={{top: 0,left:20 }}></div><div className='snow'style={{left:20 }}></div></div>)});}
            else if(tmp === "50n" || tmp === "50d")
                {setWeather(()=>{return(<div><div className='mist' style={{left:50,top:-110 }}></div></div>)});}
            else
            {setWeather(()=>{return(<div><div className='mist'></div> </div>)});}
            
        }
        selectTheDiv()
    }, [data.weather[0].icon])


    return(
    <div>
        <div className=''>
            <div className='WATa'>
                <div className="centerd">
                    {weather}
                </div>
            </div>
        </div>
    </div>)
}