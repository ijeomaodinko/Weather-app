// CityWeatherDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './weathercard';
import { API_KEY, getRandomCities } from './utils';  // Import getRandomCities

const CityWeatherDetails = () => {
  const allCities = [
    'New York', 'London', 'Tokyo', 'Paris', 'Sydney',
    'Berlin', 'Rome', 'Beijing', 'Moscow', 'Toronto', 
// cities list
];

  const [weatherData, setWeatherData] = useState([]);
  const [cities, setCities] = useState(getRandomCities(allCities, 6));  // Initial set of random cities

  useEffect(() => {
    const fetchData = async () => {
      const data = [];

      for (const city of cities) {
        try {
          const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
              q: city,
              units: 'metric',
              appid: API_KEY,
            },
          });

          data.push(response.data);
        } catch (error) {
          console.error(`Error fetching weather data for ${city}:`, error);
          // Optionally: Handle the error or set a placeholder value for the city
        }
      }

      setWeatherData(data);
    };

    fetchData();

    // Switch to the next set of random cities every 1 minute
    const intervalId = setInterval(() => {
      const nextCities = getRandomCities(allCities, 6);  // Get a new set of random cities
      setCities(nextCities);
    }, 60000); // 1 minute in milliseconds

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [cities, allCities]);

  return (
    <div className='weather-container'>
      <h5>Weather for cities of the world</h5>
      {weatherData.map((weather, index) => (
        <WeatherCard key={index} weather={weather} className={`city-card ${index >= 6 ? 'hidden' : ''}`} />
      ))}
    </div>
  );
};

export default CityWeatherDetails;
