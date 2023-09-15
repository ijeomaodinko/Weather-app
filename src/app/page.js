import Image from 'next/image'
import styles from './page.module.css'

import { useState, useEffect } from 'react';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = 'YOUR_API_KEY';

  useEffect(() => {
    // Fetch weather data when the component mounts
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=CityName`)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }, []);

  return (
    <div>
      {weatherData ? (
        <div>
          <h2>Weather in {weatherData.location.name}</h2>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          {/* Add more weather information here */}
       
