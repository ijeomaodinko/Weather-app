import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getLocation, API_KEY, getAirQualityDescription } from './utils';

const AirQualityChecker = () => {
  const [airQuality, setAirQuality] = useState(null);

  useEffect(() => {
    const fetchAirQuality = async (latitude, longitude) => {
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/air_pollution', {
          params: {
            lat: latitude,
            lon: longitude,
            appid: API_KEY,
          },
        });

        setAirQuality(response.data);
      } catch (error) {
        console.error('Error fetching air quality data:', error);
      }
    };

    const handleLocationError = () => {
      console.error('Error getting location. Defaulting to a fallback location.');
      // Provide a fallback location (e.g., city center)
      fetchAirQuality(40.7128, -74.0060); // New York City coordinates
    };

    getLocation(fetchAirQuality, handleLocationError);
  }, []);

  return (
    <div>
      <h3>Air Quality</h3>
      {airQuality && (
        <div>
          <p>Index: {airQuality.list[0].main.aqi}</p>
          <p>Description: {getAirQualityDescription(airQuality.list[0].main.aqi)}</p>
          <p>Components (μg/m3):</p>
          <ul>
            {Object.entries(airQuality.list[0].components).map(([key, value]) => (
              <li key={key}>{key}: {value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AirQualityChecker;
