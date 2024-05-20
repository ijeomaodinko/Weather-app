import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './weathercard';
import { API_KEY, getRandomCities } from './utils';  // Import getRandomCities

const cardStyles = {
  weatherContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: 'navy',
    borderRadius: '12px',
    color: 'gold',
  },
  cityCard: {
    flexBasis: '30%', // Adjust the percentage to control the width
    display: 'flex',
    margin: '10px 0',
    width: '6rem',
    // padding: '15px',
    borderRadius: '12px',
    backgroundColor: 'navy',
    color: 'gold',
  },
h5: {
    textAlign: 'center',
    width: '100%',
    color: 'gold',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    bottom: '0',
  },

};

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
    <div style={cardStyles.weatherContainer}>
    <h5 style={cardStyles.h5}>Weather for cities of the world</h5>
    {weatherData.map((weather, index) => (
      <div key={index} style={cardStyles.cityCard} className={`city-card ${index >= 6 ? 'hidden' : ''}`}>
        <WeatherCard weather={weather} />
      </div>
    ))}
  </div>
  );
};

export default CityWeatherDetails;
