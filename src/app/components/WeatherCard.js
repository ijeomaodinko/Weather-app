import React, { useState, useEffect } from 'react';
import { fetchWeatherDataByLocation } from '../utilities/weather';

const WeatherCard = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Fetch weather data for the location
    const fetchData = async () => {
      const data = await fetchWeatherDataByLocation(location.latitude, location.longitude);
      setWeatherData(data);
    };

    fetchData();
  }, [location]);

  return (
    <div>
      {weatherData && (
        <div>
          <h2>{location.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
