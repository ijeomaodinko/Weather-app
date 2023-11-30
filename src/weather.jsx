import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherIcons from './weathericon';
import { getLocation, API_KEY } from './utils';
import WeatherSearch from './weathersearch';
import HourlyWeather from './weatherhourly';
import CityWeatherDetails from './weatheritem';
import AirQualityChecker from './weatherairpolluti';


const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeatherData = async (latitude, longitude) => {
    console.log(API_KEY, latitude, longitude);
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Use the getLocation function from utils.js
    getLocation(getWeatherData, () => setLoading(false));
  }, []);

  const getWeatherIcon = (weatherCode) => {
    return WeatherIcons[weatherCode] || null;
  };

  return (
    <div>
      <h1>Weather App</h1>

      {loading && <p>Loading...</p>}

      {weatherData && !loading && (
        <div>
          <h2 className="weather-location" >Location: {weatherData.name}</h2>
          <p className="weather-temp">Temperature: {weatherData.main.temp}°C</p>
          <p className="weather-description">Weather: {weatherData.weather[0].description}</p>
          <div className="weather-icon"> {getWeatherIcon(weatherData.weather[0].icon)}</div>
        </div>
      )}
      <WeatherSearch  />
      <CityWeatherDetails />
        <HourlyWeather />
        <AirQualityChecker />
    </div>
  );
};

export default WeatherApp;
