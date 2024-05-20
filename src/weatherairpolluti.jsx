import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getLocation, API_KEY, getAirQualityDescription } from './utils';
import styled, { keyframes } from 'styled-components';

const scrollAnimation = (index) =>  keyframes`
  0% {
    transform: translateX(0); /* Start from the top */
  }
  100% {
    transform: translateX(calc(-100% - 8px)); /* Scroll up by the height of one item plus some margin */
  }
`;

// Styled component for the list
const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
  animation: ${scrollAnimation} 5s linear infinite; /* Apply the scrolling animation */
`;

// Styled component for the list item
const StyledListItem = styled.li`
display: inline-block; /* Display list items inline */
  margin-right: 20px; /* Add margin between items */
  animation: ${({ index }) => scrollAnimation(index)} 5s linear infinite; 
`;


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
    <div style={{ textAlign: 'center', backgroundColor: '#f0f0f0' }}>
    <h3 style ={{marginTop: '0', padding: '0' }}>Air Quality</h3>
    {airQuality && (
      <div style={{ backgroundColor: 'white', marginTop: '0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <p>Index: {airQuality.list[0].main.aqi}
        <span> {getAirQualityDescription(airQuality.list[0].main.aqi)}</span>
        </p>
  <div  style = {{ display: 'flex', flexDirection: 'row' }}>
        <p>Components (μg/m3):</p>
        <StyledList>
          {Object.entries(airQuality.list[0].components).map(([key, value], index) => (
            <StyledListItem key={key} index={index}>{key}: {value}</StyledListItem>
          ))}
        </StyledList>
        </div>
      </div>
    )}
  </div>
);
};

export default AirQualityChecker;
