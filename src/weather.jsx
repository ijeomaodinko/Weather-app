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
  justify-content: space-between;
  flex-wrap: wrap;
  flexDirection: row;
`;

const WeatherContainer = styled.div`
  display: flex;
  flexDirection: column;
  background-color: blue;
  margin-left: auto;
  margin-right: auto;
  margin-top: 6px;
`;

const Weatherz = styled.div`
  display: flex;
  flexDirection: column;
  margin-top: 6px;
  marginLeft: 2px;
  gap: 24rem;
`;

const Weatheri = styled.div`
  display: flex;
  flexDirection: row;
  margin-top: 6px;
  marginLeft: 2px;
`;

const WeatherInfoContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
  flexDirection: column;
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
          <Weatheri>
          <WeatherInfoContainer>
            <h5>Weather Forecast</h5>
            <h2 className="weather-location">Location: {weatherData.name}</h2>
            <p className="weather-temp">Temperature: {weatherData.main.temp}°C</p>
            <p className="weather-description">Weather: {weatherData.weather[0].description}</p>
            <div className="weather-icon"> {getWeatherIcon(weatherData.weather[0].icon)}</div>
          </WeatherInfoContainer>
        <WeatherSearch />
          </Weatheri>
        )}
        <CityWeatherDetails />
      </WeatherContainer>
      <Weatherz>
        <AirQualityChecker />
      </Weatherz>
    </WeatherWrapper>
  );
};

export default WeatherApp;
