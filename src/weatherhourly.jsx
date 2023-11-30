import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getLocation, API_KEY } from './utils';

const HourlyWeather = () => {
  const [hourlyData, setHourlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getHourlyWeatherData = async (latitude, longitude) => {
    console.log(API_KEY, latitude, longitude);
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );
      console.log(response.data);
      setHourlyData(response.data.list);
    } catch (error) {
      console.error('Error fetching hourly weather data:', error);
    }
    setLoading(false);
  };
  
  useEffect(() => {
    // Use the getLocation function from utils.js
    getLocation(getHourlyWeatherData, () => setLoading(false));
  }, []);
  
  return (
    <div>
      <h2>Hourly Weather Forecast</h2>

      {loading && <p>Loading hourly data...</p>}

      {hourlyData.length > 0 && (
        <div>
          {hourlyData.map((hour, index) => (
            <div key={index} className="hourly-item">
            <p>{new Date(hour.dt * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</p>
            <p>{hour.dt_txt}</p>
              <p>Temperature: {hour.main.temp}°C</p>
              <p>Weather: {hour.weather[0].description}</p>
              {/* Add additional details as needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HourlyWeather;
