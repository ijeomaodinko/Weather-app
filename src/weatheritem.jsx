import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './weathercard';
import { API_KEY } from './utils';
import './weatheritem.css';

const CityWeatherDetails = () => {
  const allCities = [
    'New York', 'London', 'Tokyo', 'Paris', 'Sydney',
    'Berlin', 'Rome', 'Beijing', 'Moscow', 'Toronto', 
    'Vancouver', 'Dubai', 'Cairo', 'Singapore', 'Hong Kong',
    'Barcelona', 'Los Angeles', 'Chicago', 'San Francisco', 'Washington',
    'Boston', 'Seattle', 'Las Vegas', 'Miami', 'Amsterdam',
    'Dublin', 'Madrid', 'Mumbai', 'Delhi', 'Bangkok',
    'Kuala Lumpur', 'Istanbul', 'Vienna', 'Prague', 'Stockholm',
    'Copenhagen', 'Seoul', 'Taipei', 'Jakarta', 'Manila',
    'Hanoi', 'Ho Chi Minh City', 'Helsinki', 'Oslo', 'Warsaw',
    'Lisbon', 'Zurich', 'Brussels', 'Budapest', 'Athens',  
    'Lima', 'Mexico City', 'Rio de Janeiro', 'Sao Paulo', 'Buenos Aires',
    'Cape Town', 'Johannesburg', 'Copenhagen', 'Seoul', 'Taipei','Jakarta', 
    'Oslo', 'Warsaw', 'Lisbon', 'Zurich', 'Brussels',
    'Budapest', 'Athens', 'Lima', 'Rio de Janeiro','Buenos Aires', 
    'Accra', 'Abuja', 'Enugu', 'Melbourne'
    // ... your cities list
  ];

  const [weatherData, setWeatherData] = useState([]);
  const [cities, setCities] = useState(allCities);

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
        }
      }

      setWeatherData(data);
    };

    fetchData();

    // Switch to the next set of cities every 1 minute
    const intervalId = setInterval(() => {
      const startIndex = allCities.indexOf(cities[0]);
      const nextCities = allCities.slice(startIndex + 6, startIndex + 12);
      setCities(nextCities.length > 0 ? nextCities : allCities.slice(0, 6));
    }, 60000); // 1 minute in milliseconds

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [cities, allCities]);

  return (
    <div>
      <h1>Weather Details for Cities</h1>
      {weatherData.map((weather, index) => (
        <WeatherCard key={index} weather={weather} className={`city-card ${index >= 6 ? 'hidden' : ''}`} />
      ))}
    </div>
  );
};

export default CityWeatherDetails;
