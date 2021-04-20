import { useState, useEffect } from "react";
import axios from 'axios';

const Weather = ({country}) => {
  const [weather, setWeather] = useState(null);

  const weatherHook = () => {
    const api_key = process.env.REACT_APP_API_KEY;

    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country}`)
      .then(response => {
        setWeather(response.data);
      })
  };

  useEffect(weatherHook, [country]);

  if(weather === null) {
    return <div>Loading status...</div>
  }

  return (
    <div>
      <p>Temperature: {weather.current.temperature}</p>
      <img src={weather.current.weather_icons[0]} alt="Weather icon" width="50"/>
      <p>Wind speed: {weather.current.wind_speed} MPH (direction {weather.current.wind_dir})</p>
    </div>
  )
}

export default Weather;
