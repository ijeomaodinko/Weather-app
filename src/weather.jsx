import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherIcons from './weathericon';
import { getLocation, API_KEY } from './utils';
import WeatherSearch from './weathersearch';
import CityWeatherDetails from './weatheritem';
import AirQualityChecker from './weatherairpolluti';
import styled from 'styled-components';

// Styled components for divs
const WeatherWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flexDirection: row;
  marginLeft: auto;
  marginRight: auto;
  width: 100%;
`;

const WeatherContainer = styled.div`
 display: flex;
  flex-direction: row;
  justify-content: center; /* Vertically center the content */
  align-items: center; /* Horizontally center the content */
  background-color: blue;
  margin-top: 1px;
  gap: 1rem;
  width: 100%; /* Set the width of the div to 80% of the screen */
  margin-left: auto; 
  margin-right: auto; 
`;

const Weatherz = styled.div`
 display: flex;
  flex-direction: row;
  justify-content: center; 
  align-items: center;
  position: relative; 
  left: 0; 
  top: 5rem;
  transform: translateY(-50%); /* Center the div vertically */
  background-color: blue;
  gap: 1rem;
  width: 100%; /* Set the width of the div to 80% of the screen */
`;

const WeatherInfoContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  align-items: center; /* Align content horizontally at the center */
  justify-content: center; /* Align content vertically at the center */
`;

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeatherData = async (latitude, longitude) => {
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
    getLocation(getWeatherData, () => setLoading(false));
  }, []);

  const getWeatherIcon = (weatherCode) => {
    return WeatherIcons[weatherCode] || null;
  };

  return (
    <WeatherWrapper>
      <WeatherContainer>
          
        {loading && <p>Loading...</p>}
        {weatherData && !loading && (
          <WeatherInfoContainer>
            <h5>Weather Forecast</h5>
            <h2 className="weather-location">Location: {weatherData.name}</h2>
            <p className="weather-temp">Temperature: {weatherData.main.temp}°C</p>
            <p className="weather-description">Weather: {weatherData.weather[0].description}</p>
            <div className="weather-icon"> {getWeatherIcon(weatherData.weather[0].icon)}</div>
          </WeatherInfoContainer>
        )}
        <CityWeatherDetails />
      </WeatherContainer>

      <Weatherz>
        <WeatherSearch />
        <AirQualityChecker />
      </Weatherz>
      
    </WeatherWrapper>
  );
};

export default WeatherApp;
