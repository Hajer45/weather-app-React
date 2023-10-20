import React, { useState } from 'react'
import './WeatherApp.css'
import Search_icon from '../Assets/search.png'
import Clear_icon from '../Assets/clear.png'
import Cloud_icon from '../Assets/cloud.png'
import Drizzle_icon from '../Assets/drizzle.png'
import Humidity_icon from '../Assets/humidity.png'
import Snow_icon from '../Assets/snow.png'
import Wind_icon from '../Assets/wind.png'
import Rain_icon from '../Assets/rain.png'

export const WeatherApp = () => {
    let api_key = process.env.REACT_APP_WEATHER_API_KEY;;
    const [wicon,setwicon] = useState(Cloud_icon)
    const search = async () => {
        const elm = document.querySelector(".cityInput");
        if (elm.value === '' ||!elm) {
            return 0;
        } 
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${elm.value}&units=Metric&appid=${api_key}`;
        let response = await fetch(url);
        let data = await response.json();
        console.log(response)

        const humd = document.querySelector(".humidity");
        const wind = document.querySelector(".wind-rate");
        const temp = document.querySelector(".weather-temp");
        const loc = document.querySelector(".weather-location");
        console.log(data.main.humidity)
        humd.innerHTML = Math.floor(data.main.humidity)+"%";
        wind.innerHTML = Math.floor(data.wind.speed)+" km/h";
        temp.innerHTML = Math.floor(data.main.temp)+"°c";
        loc.innerHTML = data.name;
        if(data.weather[0].icon == "01d" || data.weather[0].icon == "01n"){
            setwicon(Clear_icon);
        }
        else if(data.weather[0].icon == "02d" || data.weather[0].icon == "02n"){
            setwicon(Cloud_icon);
        }
        else if(data.weather[0].icon == "03d" || data.weather[0].icon == "03n"){
            setwicon(Drizzle_icon);
        }
        else if(data.weather[0].icon == "04d" || data.weather[0].icon == "04n"){
            setwicon(Drizzle_icon);
        }
        else if(data.weather[0].icon == "09d" || data.weather[0].icon == "09n"){
            setwicon(Rain_icon);
        }
        else if(data.weather[0].icon == "10d" || data.weather[0].icon == "10n"){
            setwicon(Rain_icon);
        }
        else if(data.weather[0].icon == "13d" || data.weather[0].icon == "13n"){
            setwicon(Snow_icon);
        }
        else{
            setwicon(Clear_icon);
        }

    }
  return (
    <div className="container">
        <div className="top-bar">
            <input type="text" className="cityInput" placeholder='City name ...' />
            <div className="search-icon" onClick={()=>{search()}}>
            <img src={Search_icon} alt="" />
            </div>
        </div>
        <div className="weather-image">
            <img src={wicon} alt="" />
        </div>
        <div className="weather-temp">
            24°C
        </div>
        <div className="weather-location">London</div>
        <div className="data-container">
            <div className="element">
                <img src={Humidity_icon} alt="" className="icon" />
                <div className="data">
                    <div className="humidity">64%</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={Wind_icon} alt="" className="icon" />
                <div className="data">
                    <div className="wind-rate">18 km/h</div>
                    <div className="wind">wind speed</div>
                </div>
            </div>
        </div>
    </div>
  )
}
